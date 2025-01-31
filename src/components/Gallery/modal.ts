import type { ImageDetails } from './types';

export class GalleryModal {
  private modal: HTMLDialogElement;
  private currentIndex: number = 0;
  private images: ImageDetails[] = [];

  constructor() {
    this.modal = document.querySelector('#gallery-modal')!;
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Close button
    this.modal.querySelector('.modal-close')?.addEventListener('click', () => this.close());

    // Navigation
    this.modal.querySelector('.nav-prev')?.addEventListener('click', () => this.navigate(-1));
    this.modal.querySelector('.nav-next')?.addEventListener('click', () => this.navigate(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.modal.open) return;
      
      switch (e.key) {
        case 'Escape': this.close(); break;
        case 'ArrowLeft': this.navigate(-1); break;
        case 'ArrowRight': this.navigate(1); break;
      }
    });

    // Touch gestures
    let touchStartX: number;
    this.modal.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });

    this.modal.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        this.navigate(diff > 0 ? 1 : -1);
      }
    });
  }

  public show(images: ImageDetails[], startIndex: number = 0) {
    this.images = images;
    this.currentIndex = startIndex;
    this.updateContent();
    this.modal.showModal();
  }

  private close() {
    this.modal.close();
  }

  private navigate(direction: number) {
    this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
    this.updateContent();
  }

  private updateContent() {
    const image = this.images[this.currentIndex];
    
    // Update image and title
    const modalImage = this.modal.querySelector('#modal-image') as HTMLImageElement;
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    
    this.modal.querySelector('#modal-title')!.textContent = image.species;

    // Update camera details
    const cameraDetails = this.modal.querySelector('#camera-details')!;
    cameraDetails.innerHTML = this.generateCameraDetails(image.camera);

    // Update post-processing
    const postProcessing = this.modal.querySelector('#post-processing')!;
    postProcessing.innerHTML = this.generatePostProcessing(image.postProcessing);

    // Update shooting context
    const shootingContext = this.modal.querySelector('#shooting-context')!;
    shootingContext.innerHTML = this.generateShootingContext(image.shooting);
  }

  private generateCameraDetails(camera: ImageDetails['camera']): string {
    return Object.entries(camera)
      .map(([key, value]) => `
        <dt class="font-medium">${this.formatKey(key)}:</dt>
        <dd>${value}</dd>
      `).join('');
  }

  private generatePostProcessing(post: ImageDetails['postProcessing']): string {
    return `
      <p><span class="font-medium">Software:</span> ${post.software.join(', ')}</p>
      <p><span class="font-medium">Adjustments:</span> ${post.adjustments.join(', ')}</p>
      <p><span class="font-medium">Effects:</span> ${post.effects.join(', ')}</p>
    `;
  }

  private generateShootingContext(shooting: ImageDetails['shooting']): string {
    return `
      <p><span class="font-medium">Lighting:</span> ${shooting.lighting}</p>
      <p><span class="font-medium">Setup:</span> ${shooting.setup}</p>
      <p><span class="font-medium">Date:</span> ${shooting.date}</p>
    `;
  }

  private formatKey(key: string): string {
    return key.replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}