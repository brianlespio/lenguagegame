import { makeCard } from "./createCard";
import type { MathCard } from "../types/card";

export const machineCards: readonly MathCard[] = [
  makeCard({
    id: "mach-bit",
    axis: "machine",
    level: "L0",
    kind: "worked",
    object: "Bit",
    title: "1011 en decimal",
    face: "1011 en binario. Cada sitio es una potencia de 2, de derecha a izquierda: 1, 2, 4, 8.",
    answer: "8 + 0 + 2 + 1 = 11.",
    definition: "Un bit es un 0 o un 1. Una cadena de bits es un número en base 2.",
    example: "1·8 + 0·4 + 1·2 + 1·1 = 11.",
    whyAi: "Cuantizar un peso a pocos bits es quedarse con cadenas cortas de este tipo. Si no lees el binario, no ves qué enteros caben.",
    trap: "Leer 1011 como mil once en decimal, o sumar los unos y contestar 3.",
    step: { ask: "Escribe el decimal", expect: "11" },
    quizForward: "¿1011 en binario, en decimal?",
    quizForwardAnswer: "11",
    quizReverse: "El decimal es 11 y la cadena de 4 bits tiene unos en 8, 2 y 1. ¿Qué cadena es?",
    quizReverseAnswer: "1011",
  }),
  makeCard({
    id: "mach-overflow-u8",
    axis: "machine",
    level: "L0",
    kind: "machine",
    object: "Desbordamiento",
    title: "Ocho bits no guardan el 256",
    face: "En 8 bits el máximo es 255, que es 11111111. Suma 1 y quédate solo con los 8 bits bajos. Python entero no desborda: la máscara 0xFF imita al registro.",
    answer: "(255 + 1) & 255 = 0. El 256 es 1 seguido de ocho ceros; esos ocho ceros son lo que cabe.",
    definition: "Hay desbordamiento cuando el resultado no cabe en el número de bits del registro y el bit que sobra se tira.",
    example: "255 + 1 = 256. 256 en binario es 1 00000000. Los ocho bajos son 00000000.",
    whyAi: "Un acumulador de 8 bits en un micro, o un entero cuantizado, da la vuelta. El gradiente entonces apunta a un sitio que no es el de la cuenta matemática.",
    trap: "Creer que Python, sin máscara, convierte 255 + 1 en 0. El int de Python crece. El desbordamiento es del ancho fijo.",
    code: {
      source: `x = 255
mask = 0xFF
wrapped = (x + 1) & mask
print(wrapped)`,
      result: "0",
    },
    step: { ask: "Escribe el resultado de 8 bits", expect: "0" },
    quizForward: "(255 + 1) & 255. ¿Qué sale?",
    quizForwardAnswer: "0",
    quizReverse: "Ocho bits dan la vuelta a 0 al sumar 1 a 255. ¿Cuántos bits tenía el registro?",
    quizReverseAnswer: "8",
  }),
  makeCard({
    id: "mach-float-add",
    axis: "machine",
    level: "L0",
    kind: "machine",
    object: "Coma flotante",
    title: "0.1 + 0.2",
    face: "En float64, ¿0.1 + 0.2 es exactamente 0.3?",
    answer: "No. 0.1 y 0.2 no tienen un desarrollo binario finito. Cada uno se guarda como un racional de denominador potencia de 2, cerca, y la suma de esas aproximaciones no es la aproximación de 0.3. El programa imprime False.",
    definition: "Un float64 es un racional de la forma ±m · 2ᵉ, con m entero de a lo más 53 bits de precisión. Muchos decimales cortos no están en ese conjunto.",
    example: "0.1 + 0.2 == 0.3 es False. La suma impresa con 17 decimales acaba en 0004, no en 0.3 exacto.",
    whyAi: "Comparar pérdidas con == es frágil. Un umbral y una tolerancia existen porque esta suma no cae donde el decimal sugiere.",
    trap: "Decir que el ordenador «se equivoca al sumar». Suma bien los números que sí tiene guardados. El decimal 0.1 no era uno de ellos.",
    code: {
      source: `a = 0.1 + 0.2
b = 0.3
print(a == b)
print(f"{a:.17f}")`,
      result: "False",
    },
    step: { ask: "¿Son iguales? sí o no", expect: "no" },
    quizForward: "En float64, ¿0.1 + 0.2 es exactamente 0.3?",
    quizForwardAnswer: "no",
    quizReverse: "a == b imprime False con a = 0.1 + 0.2 y b = 0.3. ¿Qué tipo de número está fallando al decimal?",
    quizReverseAnswer: "float64",
  }),
  makeCard({
    id: "mach-value-name",
    axis: "machine",
    level: "L0",
    kind: "machine",
    object: "Nombre y objeto",
    title: "Dos nombres, un entero",
    face: "c = 1, luego d = c, luego c = 2. ¿Qué vale d? Un entero no se modifica por dentro: reasignar c hace que el nombre c pase a otro objeto.",
    answer: "d sigue en 1. El nombre d no se entera de que c ahora apunta a 2. Con una lista sería distinto: dos nombres del mismo objeto ven el append.",
    definition: "Un nombre refiere a un objeto. Reasignar el nombre lo engancha a otro objeto. El objeto entero anterior sigue donde estaba, si alguien aún lo nombra.",
    example: "Tras c = 2, d es 1. Si fuera a = [1] y b = a, b.append(2) dejaría a en [1, 2]: mismo objeto.",
    whyAi: "Un tensor que «copias» con otro nombre no es una copia. Un experimento que muta el batch de validación a través de un alias se contamina solo.",
    trap: "Creer que d = c hace una fotografía del valor para siempre en todos los tipos. En la lista, no.",
    code: {
      source: `c = 1
d = c
c = 2
print(d)`,
      result: "1",
    },
    step: { ask: "Escribe d", expect: "1" },
    quizForward: "c = 1; d = c; c = 2. ¿d?",
    quizForwardAnswer: "1",
    quizReverse: "print(d) muestra 1 después de mover c a 2. ¿d se actualizó con c?",
    quizReverseAnswer: "no",
  }),
  makeCard({
    id: "mach-loop-sum",
    axis: "machine",
    level: "L1",
    kind: "machine",
    object: "Bucle",
    title: "Sumar 1, 2, 3 y 4",
    face: "El bucle suma la lista [1, 2, 3, 4]. ¿Qué imprime s, y cuántas vueltas dio?",
    answer: "s = 10. Cuatro vueltas. El coste es proporcional a la longitud: O(n) con n = 4.",
    definition: "Un bucle de una pasada hace un trabajo por elemento. La suma es 10 y el número de sumas es 4.",
    example: "0+1=1, +2=3, +3=6, +4=10.",
    whyAi: "Un reduce sobre el batch es este bucle. Si está escondido en una librería, el coste sigue siendo el de recorrer los datos.",
    trap: "Contestar 4, la longitud, cuando te pedían la suma, o 24, el producto.",
    code: {
      source: `s = 0
data = [1, 2, 3, 4]
for x in data:
    s = s + x
print(s)
print(len(data))`,
      result: "10 y 4",
    },
    step: { ask: "Escribe s", expect: "10" },
    quizForward: "Suma de [1, 2, 3, 4] en un bucle. ¿s?",
    quizForwardAnswer: "10",
    quizReverse: "El bucle imprime 10 y luego 4. ¿Qué lista sumó?",
    quizReverseAnswer: "[1, 2, 3, 4]",
  }),
  makeCard({
    id: "mach-map-reduce",
    axis: "machine",
    level: "L1",
    kind: "worked",
    object: "Mapa y reduce",
    title: "Doblar y luego sumar",
    face: "Lista [1, 2, 3]. Primero multiplica cada elemento por 2. Luego suma.",
    answer: "El mapa da [2, 4, 6]. El reduce suma 12. El mapa no cambia la longitud. El reduce la convierte en un número.",
    definition: "Mapa aplica la misma cuenta a cada dato y deja otra lista. Reduce junta la lista en un acumulado.",
    example: "2+4+6 = 12.",
    whyAi: "Una activación elemento a elemento es un mapa. La pérdida media del batch es un reduce. No son la misma línea.",
    trap: "Sumar primero 1+2+3 = 6 y luego doblar, que también da 12 aquí, y creer que el orden nunca importa. Con un máximo no da igual.",
    step: { ask: "Escribe la suma final", expect: "12" },
    quizForward: "[1, 2, 3], cada uno por 2, y suma. ¿El total?",
    quizForwardAnswer: "12",
    quizReverse: "El mapa por 2 y el reduce suma dan 12. ¿Qué lista de tres enteros seguidos desde 1 entró?",
    quizReverseAnswer: "[1, 2, 3]",
  }),
  makeCard({
    id: "mach-mul-matmul",
    axis: "machine",
    level: "L1",
    kind: "machine",
    object: "Producto elemento a elemento",
    title: "* no es @",
    face: "a es la identidad 2×2. b es [[2, 3], [4, 5]]. ¿Qué vale a * b?",
    answer: "[[2, 0], [0, 5]]. El * de NumPy multiplica sitio a sitio. a @ b es b, porque a es la identidad: [[2, 3], [4, 5]].",
    definition: "El asterisco entre matrices del mismo tamaño es el producto de Hadamard, elemento a elemento. @ es el producto de matrices.",
    example: "1·2 = 2, 0·3 = 0, 0·4 = 0, 1·5 = 5.",
    whyAi: "Una puerta que enmascara activaciones usa *. Una capa densa usa @. Cambiarlos cambia la cuenta.",
    trap: "Leer a * b como producto de matrices y contestar b.",
    code: {
      source: `import numpy as np
a = np.array([[1, 0], [0, 1]])
b = np.array([[2, 3], [4, 5]])
print(a * b)
print(a @ b)`,
      result: "[[2, 0], [0, 5]] y b",
    },
    step: { ask: "Esquina inferior derecha de a * b", expect: "5" },
    quizForward: "a identidad, b = [[2, 3], [4, 5]]. ¿a * b?",
    quizForwardAnswer: "[[2, 0], [0, 5]]",
    quizReverse: "a * b da un 0 en la esquina superior derecha y a es la identidad. ¿Qué operación fue, * o @?",
    quizReverseAnswer: "*",
  }),
  makeCard({
    id: "mach-axis-sum",
    axis: "machine",
    level: "L1",
    kind: "machine",
    object: "Eje",
    title: "sum(axis=0)",
    face: "a = [[1, 2], [3, 4]]. En NumPy, axis=0 baja por las filas y suma columnas. ¿a.sum(axis=0)?",
    answer: "[4, 6]. axis=1 suma cada fila: [3, 7]. El eje es la dirección que desaparece.",
    definition: "axis=0 recorre la primera dimensión. En una matriz fila-columna, suma las filas entre sí y deja un número por columna.",
    example: "1+3 = 4, 2+4 = 6. 1+2 = 3, 3+4 = 7.",
    whyAi: "La media del batch es un sum(axis=0) partido por el número de filas, si cada fila es un ejemplo. Elegir el eje mal promedia las features entre sí.",
    trap: "Creer que axis=0 significa «la fila 0». Significa el eje que se recorre, no un índice.",
    code: {
      source: `import numpy as np
a = np.array([[1, 2], [3, 4]])
print(a.sum(axis=0))
print(a.sum(axis=1))`,
      result: "[4 6] y [3 7]",
    },
    step: { ask: "Escribe sum(axis=0)", expect: "[4, 6]", accept: ["[4,6]", "[4 6]"] },
    quizForward: "[[1, 2], [3, 4]]. ¿Suma con axis=0?",
    quizForwardAnswer: "[4, 6]",
    quizReverse: "La suma por columnas es [4, 6]. ¿Qué matriz 2×2 de enteros pequeños del enunciado era?",
    quizReverseAnswer: "[[1, 2], [3, 4]]",
  }),
  makeCard({
    id: "mach-vector-scale",
    axis: "machine",
    level: "L2",
    kind: "machine",
    object: "Vectorizar",
    title: "2x de un golpe",
    face: "x = [1, 2, 3, 4]. y = 2 * x, coordenada a coordenada, y luego la suma. ¿La suma?",
    answer: "y = [2, 4, 6, 8]. La suma es 20. Es el mapa «por 2» y un reduce, escritos sin bucle visible. El trabajo sigue siendo proporcional a 4.",
    definition: "Vectorizar es aplicar la misma operación a todo el vector. No reduce el número de sumas: las hace el mismo patrón, de una vez en la notación.",
    example: "2+4+6+8 = 20.",
    whyAi: "Una capa que escalas por un float es esta línea. El coste no desaparece porque hayas quitado el for.",
    trap: "Creer que 2 * x en NumPy concatena o hace un producto punto. Con un escalar, es el mapa.",
    code: {
      source: `import numpy as np
x = np.array([1, 2, 3, 4])
y = 2 * x
print(y.sum())`,
      result: "20",
    },
    step: { ask: "Escribe la suma", expect: "20" },
    quizForward: "x = [1, 2, 3, 4]. ¿Suma de 2x?",
    quizForwardAnswer: "20",
    quizReverse: "2 * x suma 20 y x tiene cuatro enteros seguidos desde 1. ¿Qué es x?",
    quizReverseAnswer: "[1, 2, 3, 4]",
  }),
  makeCard({
    id: "mach-nested",
    axis: "machine",
    level: "L2",
    kind: "machine",
    object: "Doble bucle",
    title: "4 por 4",
    face: "n = 4. Un bucle dentro de otro, los dos de n vueltas, suma 1 al contador. ¿Cuánto queda?",
    answer: "16. Es n². O(n²), no O(n).",
    definition: "Dos bucles anidados de n, con trabajo constante dentro, hacen n·n pasos.",
    example: "4·4 = 16.",
    whyAi: "Multiplicar dos matrices n×n densas es este patrón: por cada par (i, k) hay un recorrido. Por eso una capa densa grande pesa.",
    trap: "Sumar 4 + 4 = 8, contando vueltas del bucle exterior nada más.",
    code: {
      source: `count = 0
n = 4
for i in range(n):
    for j in range(n):
        count = count + 1
print(count)`,
      result: "16",
    },
    step: { ask: "Escribe count", expect: "16" },
    quizForward: "Dos bucles anidados, n = 4, una suma por par. ¿Cuántas sumas?",
    quizForwardAnswer: "16",
    quizReverse: "El contador queda en 16 con dos bucles de la misma n. ¿n?",
    quizReverseAnswer: "4",
  }),
  makeCard({
    id: "mach-gemm-relu",
    axis: "machine",
    level: "L2",
    kind: "machine",
    object: "Capa densa y ReLU",
    title: "Primero @, luego el corte",
    face: "W = [[1, −3], [0, 2]], x = [2, 1]. Calcula z = W @ x y y = máximo(z, 0) coordenada a coordenada.",
    answer: "z = [1·2 + (−3)·1, 0·2 + 2·1] = [−1, 2]. ReLU pone a 0 lo negativo: y = [0, 2].",
    definition: "Una capa densa con ReLU es un producto matriz-vector y, después, un mapa que cambia los negativos por cero.",
    example: "2 − 3 = −1. 2·1 = 2. max(−1, 0) = 0. max(2, 0) = 2.",
    whyAi: "Una red, en el mínimo, es esto repetido: producto con los pesos y una función no lineal. Sin la no lineal, dos capas seguidas se funden en una sola matriz.",
    trap: "Aplicar ReLU antes del producto, o cambiar el −1 por 1 «porque la red no saca negativos».",
    code: {
      source: `import numpy as np
W = np.array([[1.0, -3.0], [0.0, 2.0]])
x = np.array([2.0, 1.0])
z = W @ x
y = np.maximum(z, 0)
print(y)`,
      result: "[0. 2.]",
    },
    step: { ask: "Escribe y", expect: "[0, 2]", accept: ["[0,2]", "[0. 2.]"] },
    quizForward: "W = [[1, −3], [0, 2]], x = [2, 1]. ¿ReLU(W @ x)?",
    quizForwardAnswer: "[0, 2]",
    quizReverse: "ReLU(W @ x) = [0, 2] y z tenía un −1. ¿Qué le hizo ReLU a ese −1?",
    quizReverseAnswer: "lo puso a 0",
  }),
  makeCard({
    id: "mach-float-cancel",
    axis: "machine",
    level: "L2",
    kind: "machine",
    object: "Estabilidad",
    title: "El 1 que no cabe al lado de 10¹⁶",
    face: "En float64, a = 10¹⁶. Calcula (a + 1) − a.",
    answer: "0. Alrededor de 10¹⁶ el hueco entre dos float64 es 2, así que a + 1 se guarda como a. Restar a deja 0. La cuenta matemática sería 1.",
    definition: "Precisión es cuántos dígitos caben. Estabilidad es si el procedimiento amplifica el hecho de que no caben todos. Aquí el procedimiento pierde el 1.",
    example: "10.0**16 + 1.0 == 10.0**16 es verdadero en float64. La resta da 0.0.",
    whyAi: "Restar dos pérdidas enormes y parecidas, o dos softmax sin restar el máximo, tira la información que estaba en los dígitos bajos.",
    trap: "Decir que la resta da 1 porque «sumar y restar se cancelan». En este ancho, el 1 nunca llegó a sumarse.",
    code: {
      source: `a = 10.0 ** 16
b = (a + 1.0) - a
print(b)
print(a + 1.0 == a)`,
      result: "0.0 y True",
    },
    step: { ask: "Escribe (a + 1) - a", expect: "0", accept: ["0.0"] },
    quizForward: "float64: (10**16 + 1) − 10**16. ¿Qué sale?",
    quizForwardAnswer: "0",
    quizReverse: "La resta da 0 y a + 1 se guardó igual que a. ¿En qué sistema de números pasó?",
    quizReverseAnswer: "float64",
  }),
  makeCard({
    id: "mach-backprop",
    axis: "machine",
    level: "L3",
    kind: "machine",
    object: "Backprop en seis líneas",
    title: "El mismo peso, en Python",
    face: "x = 3, w = 1, t = 1, ŷ = w·x, L = (ŷ − t)². El programa imprime L y dL/dw. ¿dL/dw?",
    answer: "12. ŷ = 3, L = 4, dL/dŷ = 4, y 4·x = 12. Es la cadena del grafo de un peso, escrita a mano.",
    definition: "El programa no entrena: evalúa la derivada en un punto. Entrenar sería restar un paso η·12 a w.",
    example: "(3 − 1)² = 4. 2·2·3 = 12.",
    whyAi: "Si esta celda no cuadra con la cuenta a mano, no tienes con qué contrastar un autograd.",
    trap: "Imprimir dw = dy * w y obtener 4, usando el peso en lugar del dato.",
    code: {
      source: `x, w, t = 3, 1, 1
y = w * x
loss = (y - t) ** 2
dy = 2 * (y - t)
dw = dy * x
print(dw)`,
      result: "12",
    },
    step: { ask: "Escribe dw", expect: "12" },
    quizForward: "x = 3, w = 1, t = 1, L = (wx − t)². ¿dL/dw?",
    quizForwardAnswer: "12",
    quizReverse: "print(dw) muestra 12 con x = 3 y w = 1. ¿Qué se multiplicó por dy para obtener dw?",
    quizReverseAnswer: "x",
  }),
  makeCard({
    id: "mach-int8",
    axis: "machine",
    level: "L3",
    kind: "machine",
    object: "Complemento a dos",
    title: "127 + 1 en 8 bits con signo",
    face: "En 8 bits con signo, 127 es 01111111. Suma 1 dentro de esos 8 bits y lee el bit alto como signo.",
    answer: "−128. El patrón 10000000 es el negativo más grande en complemento a dos de 8 bits, no +128.",
    definition: "En complemento a dos, si el bit alto está a 1, el valor es el patrón sin signo menos 2⁸. 128 − 256 = −128.",
    example: "(127 + 1) & 255 = 128. 128 ≥ 128, así que 128 − 256 = −128.",
    whyAi: "Un entero de 8 bits con signo en inferencia cuantizada desborda de 127 a −128. La activación cambia de signo sin que la matemática real lo pida.",
    trap: "Decir que 127 + 1 = 128, como si el bit de signo no existiera.",
    code: {
      source: `n = (127 + 1) & 0xFF
signed = n - 256 if n >= 128 else n
print(n)
print(signed)`,
      result: "128 y −128",
    },
    step: { ask: "Escribe el valor con signo", expect: "-128", accept: ["−128"] },
    quizForward: "int8: 127 + 1. ¿Qué valor con signo sale?",
    quizForwardAnswer: "-128",
    quizReverse: "El patrón 10000000 en 8 bits con signo vale −128. ¿Qué suma lo produjo desde 127?",
    quizReverseAnswer: "127 + 1",
  }),
  makeCard({
    id: "mach-precision",
    axis: "machine",
    level: "L3",
    kind: "identity",
    object: "Precisión y estabilidad",
    title: "Cabencia y procedimiento",
    face: "1 y 10¹⁶ viven en escalas distintas dentro del mismo float64. ¿(10¹⁶ + 1) − 10¹⁶ es 1?",
    answer: "No: sale 0. Precisión: el 1 no cabe al lado de 10¹⁶. Estabilidad: la expresión suma y luego resta, y ese orden tira el 1. Otra expresión, si ya supieras que quieres 1, no haría el rodeo.",
    definition: "Precisión es el hueco entre números representables. Estabilidad es si el algoritmo agranda ese hueco hasta cambiar el resultado que te importa.",
    example: "En float64, 10¹⁶ + 1 se almacena como 10¹⁶. Restar 10¹⁶ da 0.",
    whyAi: "Softmax estable resta el máximo antes de la exponencial. Es el mismo cuidado: no calcular un rodeo que se come los dígitos.",
    trap: "Usar las dos palabras como sinónimos. Puedes tener buena precisión y un algoritmo inestable, y al revés.",
    step: { ask: "Escribe el resultado de la resta", expect: "0", accept: ["0.0"] },
    quizForward: "¿(10**16 + 1) − 10**16 en float64?",
    quizForwardAnswer: "0",
    quizReverse: "El resultado es 0 y la cuenta matemática era 1. ¿Qué se perdió, el procedimiento o un p-valor?",
    quizReverseAnswer: "el 1, por el orden de las operaciones",
  }),
  makeCard({
    id: "mach-two-layer",
    axis: "machine",
    level: "L3",
    kind: "machine",
    object: "Dos capas",
    title: "Otra vez @ y un corte",
    face: "x = [1, 0]. W1 = [[1, 1], [0, 1]]. h = ReLU(W1 @ x). W2 = [[2, 3]]. ¿W2 @ h?",
    answer: "W1 @ x = [1, 0]. ReLU lo deja igual. W2 @ h = 2·1 + 3·0 = 2. Dos matrices y una no lineal.",
    definition: "Una red pequeña hacia adelante es una sucesión de productos con matrices y mapas no lineales. Aquí la no lineal no muerde porque las dos coordenadas salen no negativas.",
    example: "[1, 0] contra la primera fila (1, 1) da 1. Contra (0, 1) da 0. Luego 2·1 + 3·0 = 2.",
    whyAi: "Si quitas el ReLU, W2 @ W1 es una sola matriz y la red de dos capas no puede más que una de una. La no lineal es lo que impide esa fusión.",
    trap: "Multiplicar W2 por x saltándote h, y obtener 2 igual por casualidad en este x. Con otro x no cuadra.",
    code: {
      source: `import numpy as np
x = np.array([1.0, 0.0])
W1 = np.array([[1.0, 1.0], [0.0, 1.0]])
h = np.maximum(W1 @ x, 0)
W2 = np.array([[2.0, 3.0]])
y = W2 @ h
print(float(y[0]))`,
      result: "2.0",
    },
    step: { ask: "Escribe y", expect: "2", accept: ["2.0"] },
    quizForward: "x = [1, 0], W1 = [[1, 1], [0, 1]], W2 = [[2, 3]], con ReLU en medio. ¿La salida?",
    quizForwardAnswer: "2",
    quizReverse: "La salida es 2 y h = [1, 0]. W2 = [[2, 3]]. ¿Qué producto final se hizo?",
    quizReverseAnswer: "W2 @ h",
  }),
];
