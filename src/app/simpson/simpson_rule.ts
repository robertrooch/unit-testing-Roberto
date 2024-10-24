export class SimpsonRule {
  static simpson(x0: number, x1: number, numSeg: number, error: number, func: (x: number) => number): number {
    const h = (x1 - x0) / numSeg;
    let sum = func(x0) + func(x1);

    for (let i = 1; i < numSeg; i++) {
      const x = x0 + i * h;
      sum += (i % 2 === 0 ? 2 : 4) * func(x);
    }

    return (h / 3) * sum;
  }

  static fx_2x(x: number): number {
    return 2 * x;
  }

  static fx_x2(x: number): number {
    return Math.pow(x, 2);
  }

  static fx_1_x(x: number): number {
    return 1 / x;
  }

  static gamma(x: number): number {
    const sqrtPi = Math.sqrt(Math.PI);

    if (Number.isInteger(x)) {
      // Cálculo para números enteros (factorial)
      let result = 1;
      for (let i = x - 1; i > 0; i--) {
        result *= i;
      }
      return result;
    } else {
      let result = 1;
      while (x > 0.5) {
        result *= (x - 1);
        x -= 1;
      }

      return result * sqrtPi;
    }
  }

  static TStudent_FirstPart(x: number, dof: number): number {
    const base = 1 + Math.pow(x, 2) / dof;
    const exponente = -(dof + 1) / 2;
    const resultado = Math.pow(base, exponente);
    return resultado;
  }

  static TStudent_SecondPart(dof: number): number {
    // Cálculo de Γ((dof + 1) / 2)
    const gammaNumerador = this.gamma((dof + 1) / 2);

    // Cálculo de Γ(dof / 2)
    const gammaDenominador = this.gamma(dof / 2);

    // Cálculo de √(dof * π)
    const divisor = Math.sqrt(dof * Math.PI);

    // Retornar la expresión completa
    const resultado = gammaNumerador / (divisor * gammaDenominador);
    return resultado;
  }

  static TStudent_ThirdPart(x1: number, x2: number,): number {
    const resultado = x1 * x2
    return resultado;
  }

  static calcularMUltiplicador(longitud: number, i: number): number {
    if (i === 0 || i === longitud) {
      return 1;
    } else if (i % 2 === 0) {
      return 2;
    } else {
      return 4;
    }
  }

  static TStudent(x: number, num_seg: number, dof: number, e: number): number {
    let count = 1; // Contador de vueltas
    let check_e = 0; // Valor de la iteración anterior
    let lon = num_seg; // Número de segmentos
    let w = x / lon; // Tamaño del paso
    let suma = 0; // Suma inicial
    let resul_check = 0; // Resultado de la comparación

    do {
      console.log("VUELTA: " + count);
      w = x / lon; // Recalcular el tamaño del paso
      suma = 0; // Reiniciar la suma para cada vuelta

      // Bucle para calcular la suma
      for (let i = 0; i <= lon; i++) {
        let xi = w * i;
        let firstPart = this.TStudent_FirstPart(xi, dof);
        let secondPart = this.TStudent_SecondPart(dof);
        let thirdPart = this.TStudent_ThirdPart(firstPart, secondPart);
        let multiplicador = this.calcularMUltiplicador(lon, i);

        suma += (w / 3) * multiplicador * thirdPart;

        console.log("-------- ${i} --------");
        console.log("x: ${xi}");
        console.log("FirstPart: ${firstPart}");
        console.log("SecondPart: ${secondPart}");
        console.log("ThirdPart: ${thirdPart}");
        console.log("Multiplicador: ${multiplicador}");
        console.log("Parcial: ${parseFloat(((w / 3) * multiplicador * thirdPart).toFixed(5))}");
      }

      lon += 10; 
      console.log("Nuevo lon: ${lon}");

      // Comparación solo si ya hemos pasado al menos dos vueltas
      if (count >= 2) {
        resul_check = Math.abs(check_e - suma); // Diferencia absoluta
        console.log("CHECK E: ${check_e}");
        console.log("SUMA: ${suma}");
        console.log("RESUL CHECK: ${resul_check}");
      }

      check_e = suma; 
      count += 1; 

    } while (count < 3 || resul_check > e); // Forzar al menos 2 vueltas antes de validar

    // Devolver la suma final con 7 decimales
    return parseFloat(suma.toFixed(7));
  }

}