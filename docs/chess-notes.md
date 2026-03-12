# Notación y aperturas de ajedrez

## Notación algebraica estándar (SAN)

### Piezas

| Símbolo (inglés) | Símbolo (español) | Pieza   | Unicode blancas | Unicode negras |
| ---------------- | ----------------- | ------- | --------------- | -------------- |
| K                | R                 | Rey     | ♔               | ♚              |
| Q                | D                 | Dama    | ♕               | ♛              |
| R                | T                 | Torre   | ♖               | ♜              |
| B                | A                 | Alfil   | ♗               | ♝              |
| N                | C                 | Caballo | ♘               | ♞              |
| (nada)           | (nada)            | Peón    | ♙               | ♟              |

> **Nota de implementación:** chess.js y el estándar PGN usan la notación inglesa internamente (K, Q, R, B, N). La app convierte a español en la presentación mediante `toSpanishSAN()`.

### Coordenadas

- Columnas (files): a–h de izquierda a derecha (perspectiva blancas)
- Filas (ranks): 1–8 de abajo a arriba
- Casilla = columna + fila: `e4`, `d5`, `g1`

### Formato de jugada

```
[Pieza][origen-desambiguación][x][destino][=Promoción][+/#]
```

| Ejemplo | Significado                                    |
| ------- | ---------------------------------------------- |
| `e4`    | Peón avanza a e4                               |
| `Nf3`   | Caballo a f3                                   |
| `Nxe5`  | Caballo captura en e5                          |
| `dxe5`  | Peón de la columna d captura en e5             |
| `Bb5+`  | Alfil a b5, jaque                              |
| `Qh7#`  | Dama a h7, jaque mate                          |
| `O-O`   | Enroque corto (rey)                            |
| `O-O-O` | Enroque largo (reina)                          |
| `e8=Q`  | Peón promociona a dama en e8                   |
| `Rae1`  | Torre de la columna a va a e1 (desambiguación) |

### Anotaciones de calidad

| Símbolo | Significado           |
| ------- | --------------------- |
| `!`     | Buena jugada          |
| `!!`    | Jugada brillante      |
| `?`     | Error                 |
| `??`    | Error grave (blunder) |
| `!?`    | Jugada interesante    |
| `?!`    | Jugada dudosa         |

---

## Estructura del proyecto

### Árbol de aperturas (`src/data/openings.js`)

Cada nodo del árbol tiene la siguiente forma:

```js
{
  id: "unique-id",
  move: "e4",           // SAN en inglés (para chess.js)
  name: "Peón de Rey",  // Nombre de la apertura (opcional)
  annotation: "...",    // Nota explicativa (aparece en tooltip)
  color: "white",       // "white" | "black" — quién mueve
  opening: "root",      // clave de color en OPENING_COLORS
  children: [ ... ]
}
```

### Colores por apertura (`src/components/OpeningTree.jsx`)

| Clave          | Apertura    | Color primario |
| -------------- | ----------- | -------------- |
| `root`         | Inicio      | Marrón         |
| `scandinavian` | Escandinava | Verde          |
| `spanish`      | Española    | Azul           |
| `italian`      | Italiana    | Naranja        |
| `sicilian`     | Siciliana   | Rojo           |

---

## Apertura Escandinava (Scandinavian Defense)

**ECO: B01** — `1. e4 d5`

Las negras desafían el centro inmediatamente en el movimiento 1. La idea es cambiar el peón d por el peón e blanco y desarrollarse activamente.

### Línea A — Recaptura con dama (main line)

```
1. e4  d5
2. exd5 Qxd5
3. Nc3  Qa5 / Qd6
4. d4   Nf6
5. Nf3  Bf5
```

### Línea B — Recaptura con caballo (Modern)

```
1. e4  d5
2. exd5 Nf6
3. d4   Nxd5
4. Nf3  g6   (variante fianchetto)
```

### Línea C — Gambito Islandés

```
1. e4  d5
2. exd5 Nf6
3. c4   e6   (sacrificio de peón por actividad)
```

---

## Apertura Italiana (Giuoco Piano)

**ECO: C50–C59** — `1. e4 e5 2. Nf3 Nc6 3. Bc4`

El alfil apunta a f7, la casilla más débil de las negras al inicio. Busca un desarrollo rápido y control del centro.

### Línea A — Giuoco Piano clásico

```
1. e4  e5
2. Nf3 Nc6
3. Bc4 Bc5     (espejo de alfiles)
4. c3  Nf6
5. d4  exd4
6. cxd4 Bb4+
```

### Línea B — Ataque Evans (gambito)

```
1. e4  e5
2. Nf3 Nc6
3. Bc4 Bc5
4. b4  Bxb4    (sacrificio de peón por desarrollo)
5. c3  Ba5
6. d4
```

### Línea C — Variante húngara

```
1. e4  e5
2. Nf3 Nc6
3. Bc4 Be7     (defensiva, evita complicaciones)
```

---

## Apertura Española / Ruy López

**ECO: C60–C99** — `1. e4 e5 2. Nf3 Nc6 3. Bb5`

El alfil pina el caballo que defiende e5. Una de las aperturas más profundas y analizadas. Nombrada por el sacerdote español del siglo XVI Ruy López de Segura.

### Línea A — Defensa Morphy / Variante Cerrada

```
1. e4  e5
2. Nf3 Nc6
3. Bb5 a6        (desafía al alfil)
4. Ba4 Nf6
5. O-O Be7
6. Re1 b5
7. Bb3 O-O
8. c3  d6
```

### Línea B — Defensa Berlín

```
1. e4  e5
2. Nf3 Nc6
3. Bb5 Nf6
4. O-O Nxe4
5. d4  Nd6
6. Bxc6 dxc6
7. dxe5 Nf5
8. Qxd8+ Kxd8   (el "final de Berlín", muy sólido)
```

### Línea C — Variante de Cambio

```
1. e4  e5
2. Nf3 Nc6
3. Bb5 a6
4. Bxc6 dxc6    (dobla los peones negros)
5. O-O  f6
```

### Línea D — Ataque Marshall

```
1. e4  e5
2. Nf3 Nc6
3. Bb5 a6
4. Ba4 Nf6
5. O-O Be7
6. Re1 b5
7. Bb3 O-O
8. c3  d5        (gambito de peón agresivo)
```

### Línea E — Gambito Schliemann-Jaenisch

```
1. e4  e5
2. Nf3 Nc6
3. Bb5 f5        (respuesta agresiva y poco ortodoxa)
```

---

## Defensa Siciliana

**ECO: B20–B99** — `1. e4 c5`

La respuesta más popular a 1.e4. Las negras evitan la simetría y luchan por la casilla d4 de forma asimétrica. Normalmente lleva a partidas agudas y desequilibradas.

**Tronco común (Siciliana Abierta)**:

```
1. e4  c5
2. Nf3
3. d4  cxd4
4. Nxd4
```

### Línea A — Variante Najdorf

```
5. Nc3 a6        (prepara ...e5 y previene Nb5)
6. Bg5 e6
7. f4  Be7
```

### Línea B — Variante Dragón

```
5. Nc3 g6        (fianchetto del alfil en g7)
6. Be3 Bg7
7. f3  O-O
```

### Línea C — Variante Scheveningen

```
5. Nc3 e6        (estructura de peones flexible e6+d6)
6. Be2 Be7
7. O-O O-O
```

### Línea D — Variante Clásica

```
2. Nf3 Nc6
4. Nxd4 Nf6
5. Nc3 d6
6. Bg5 e6
```

### Línea E — Variante Kan / Taimanov

```
2. Nf3 e6
4. Nxd4 a6       (flexible, evita compromisos tempranos)
5. Nc3 Qc7
```
