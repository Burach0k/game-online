export function throttle(time: number) {
  return (target: Object, propertyName: string, descriptor: PropertyDescriptor) => {
    const nativeMethod = target[propertyName];

    let isFirstCall: boolean = true;
    let isWaiting: boolean = false;

    descriptor.value = function (...args) {
      if (isFirstCall || !isWaiting) {
        nativeMethod(...args);
        isFirstCall = false;
        isWaiting = true;
        setTimeout(() => (isWaiting = false), time);
      }
    };
  };
}
