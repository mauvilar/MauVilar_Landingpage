const PALABRAS = [
  "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
  "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho",
  "diecinueve", "veinte",
];

/** Cifras chicas en letra dentro del texto corrido: "cuatro proyectos". */
export const enPalabras = (n: number) => PALABRAS[n] ?? String(n);

/** Dos dígitos para numerar filas: 01, 02, … */
export const dosDigitos = (n: number) => String(n).padStart(2, "0");
