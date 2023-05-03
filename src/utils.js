export default function getStatusAsString(statusInt) {
  switch (statusInt) {
    case 0:
      return 'Placed';
    case 1:
      return 'Processed';
    case 2:
      return 'Shipped';
    case 3:
      return 'Out for Delivery';
    case 4:
      return 'Delivered';
    default:
      return 'Unknown Status';
  }
}
