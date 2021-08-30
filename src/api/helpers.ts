export const timeout = (time: number, abort?: AbortSignal) => {
  return new Promise<void>((resolve, reject) => {
    const handle = setTimeout(() => {
      resolve();
    }, time);

    if (abort) {
      abort.addEventListener("abort", function () {
        const error = new Error("Timeout canceled")
        error.name = "AbortError"

        clearTimeout(handle);
        reject(error);
      });
    }
  });
};

const CURRENCY_FORMAT = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

export const formatCurrency = (price: number) => {
  return CURRENCY_FORMAT.format(price);
}