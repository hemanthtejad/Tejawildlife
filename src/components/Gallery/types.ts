export interface ImageDetails {
  id: string;
  src: string;
  alt: string;
  species: string;
  location: string;
  camera: {
    make: string;
    model: string;
    lens: string;
    focalLength: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
  };
  postProcessing: {
    software: string[];
    adjustments: string[];
    effects: string[];
  };
  shooting: {
    lighting: string;
    setup: string;
    date: string;
  };
}