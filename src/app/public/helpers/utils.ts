const PRICE_BELOW_20_KM = 30000;
const PRICE_ABOVE_20_KM = 40000;

export function calculateDeliveryCharge(distanceByMeter: number) {
  const kmCount = distanceByMeter / 1000;
  let deliveryCharge = 0;

  if (kmCount < 0) {
    deliveryCharge = 0;
  }

  if (kmCount < 20) {
    deliveryCharge = PRICE_BELOW_20_KM;
  } else {
    deliveryCharge = PRICE_ABOVE_20_KM;
  }

  return deliveryCharge;
}
