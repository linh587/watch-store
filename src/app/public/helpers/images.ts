import { Cloudinary } from "@cloudinary/url-gen";
import { limitFit, thumbnail } from "@cloudinary/url-gen/actions/resize";
import { ENVIRONMENT } from "../constants/api-url";

const CLOUD_NAME_CLOUDINARY = "dxi76qrjw";
const IMAGE_UPLOAD_ENDPOINT = ENVIRONMENT + "image/upload";

export const cloudinary = new Cloudinary({
  cloud: { cloudName: CLOUD_NAME_CLOUDINARY },
});

export function createCloudinaryThumb(
  publicId: string,
  width: number = 150,
  heigh: number = 150
) {
  return cloudinary.image(publicId).resize(thumbnail(width, heigh));
}

export function createCloudinaryThumbLink(publicId: string) {
  const thumbnailImageLink = createCloudinaryThumb(publicId).toURL();

  return thumbnailImageLink;
}

export function createCloudinaryImage(
  publicId: string,
  width?: number,
  heigh?: number
) {
  const image = cloudinary.image(publicId).resize(limitFit(width, heigh));
  return image;
}

export function createCloudinaryImageLink(
  publicId: string,
  width?: number,
  heigh?: number
) {
  const imageLink = createCloudinaryImage(publicId, width, heigh).toURL();
  return imageLink;
}
