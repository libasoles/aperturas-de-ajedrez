// Árbol de aperturas de ajedrez
export const OPENING_TREE = {
  id: "root",
  move: "Inicial",
  name: null,
  annotation: null,
  color: "white",
  opening: "root",
  children: [
    {
      id: "e4",
      move: "e4",
      name: "Peón de Rey",
      annotation: "Controla el centro",
      color: "white",
      opening: "root",
      children: [
        // ── ESCANDINAVA ──────────────────────────────────────────────────
        {
          id: "scan-1",
          move: "d5",
          name: "Escandinava",
          annotation: "Desafío inmediato al centro",
          color: "black",
          opening: "scandinavian",
          children: [
            {
              id: "scan-2",
              move: "exd5",
              name: null,
              annotation: "Acepta el peón",
              color: "white",
              opening: "scandinavian",
              children: [
                {
                  id: "scan-3a",
                  move: "Qxd5",
                  name: "Recaptura con dama",
                  annotation: "Línea principal",
                  color: "black",
                  opening: "scandinavian",
                  children: [
                    {
                      id: "scan-4a",
                      move: "Nc3",
                      name: null,
                      annotation: "Ataca la dama",
                      color: "white",
                      opening: "scandinavian",
                      children: [
                        {
                          id: "scan-5a1",
                          move: "Qd6",
                          name: "Mieses-Kotroc",
                          annotation: "Línea moderna principal",
                          color: "black",
                          opening: "scandinavian",
                          children: [
                            {
                              id: "scan-6a1",
                              move: "d4",
                              name: null,
                              annotation: "Consolida el centro",
                              color: "white",
                              opening: "scandinavian",
                              children: [
                                {
                                  id: "scan-7a1",
                                  move: "Nf6",
                                  name: null,
                                  annotation: "Desarrollo natural",
                                  color: "black",
                                  opening: "scandinavian",
                                  children: [
                                    {
                                      id: "scan-8a1",
                                      move: "Nf3",
                                      name: null,
                                      annotation: "Desarrollo activo",
                                      color: "white",
                                      opening: "scandinavian",
                                      children: [
                                        {
                                          id: "scan-9a1a",
                                          move: "g6",
                                          name: "Fianchetto",
                                          annotation: "Alfil en g7",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10a1a", move: "h3", name: null, annotation: "Previene Bg4", color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11a1a", move: "Bg7", name: null, annotation: null, color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12a1a", move: "Be2", name: null, annotation: null, color: "white", opening: "scandinavian", children: [
                                                  { id: "scan-13a1a", move: "O-O", name: "Fianchetto completo", annotation: "Posición sólida para negras", color: "black", opening: "scandinavian", children: [] }
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "scan-9a1b",
                                          move: "Bg4",
                                          name: null,
                                          annotation: "Clava el caballo",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10a1b", move: "Be2", name: null, annotation: null, color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11a1b", move: "Bxf3", name: null, annotation: "Dobla los peones blancos", color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12a1b", move: "Bxf3", name: null, annotation: null, color: "white", opening: "scandinavian", children: [
                                                  { id: "scan-13a1b", move: "e6", name: "Estructura sólida", annotation: null, color: "black", opening: "scandinavian", children: [] }
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "scan-5a2",
                          move: "Qa5",
                          name: "Clásica",
                          annotation: "Dama en a5, presión en el flanco",
                          color: "black",
                          opening: "scandinavian",
                          children: [
                            {
                              id: "scan-6a2",
                              move: "d4",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "scandinavian",
                              children: [
                                {
                                  id: "scan-7a2",
                                  move: "Nf6",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "scandinavian",
                                  children: [
                                    {
                                      id: "scan-8a2",
                                      move: "Nf3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "scandinavian",
                                      children: [
                                        {
                                          id: "scan-9a2a",
                                          move: "Bg4",
                                          name: null,
                                          annotation: "Clavada activa",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10a2a", move: "h3", name: null, annotation: null, color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11a2a", move: "Bxf3", name: null, annotation: null, color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12a2a", move: "Qxf3", name: null, annotation: null, color: "white", opening: "scandinavian", children: [
                                                  { id: "scan-13a2a", move: "e6", name: "Clásica Qa5", annotation: "Negras completan el desarrollo", color: "black", opening: "scandinavian", children: [] }
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "scan-9a2b",
                                          move: "e6",
                                          name: null,
                                          annotation: "Sólido",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10a2b", move: "Bc4", name: null, annotation: "Desarrollo activo", color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11a2b", move: "Bb4", name: null, annotation: null, color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12a2b", move: "Bd2", name: null, annotation: null, color: "white", opening: "scandinavian", children: [
                                                  { id: "scan-13a2b", move: "O-O", name: "Escandinava Clásica", annotation: "Negras castran corto", color: "black", opening: "scandinavian", children: [] }
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "scan-3b",
                  move: "Nf6",
                  name: "Moderna (caballo)",
                  annotation: "Evita el desarrollo temprano de la dama",
                  color: "black",
                  opening: "scandinavian",
                  children: [
                    {
                      id: "scan-4b",
                      move: "d4",
                      name: null,
                      annotation: null,
                      color: "white",
                      opening: "scandinavian",
                      children: [
                        {
                          id: "scan-5b1",
                          move: "Nxd5",
                          name: null,
                          annotation: "Recaptura con el caballo",
                          color: "black",
                          opening: "scandinavian",
                          children: [
                            {
                              id: "scan-6b1",
                              move: "Nf3",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "scandinavian",
                              children: [
                                {
                                  id: "scan-7b1a",
                                  move: "g6",
                                  name: "Fianchetto",
                                  annotation: "Alfil en g7",
                                  color: "black",
                                  opening: "scandinavian",
                                  children: [
                                    {
                                      id: "scan-8b1a",
                                      move: "c4",
                                      name: null,
                                      annotation: "Expulsa el caballo",
                                      color: "white",
                                      opening: "scandinavian",
                                      children: [
                                        {
                                          id: "scan-9b1a",
                                          move: "Nb6",
                                          name: null,
                                          annotation: "Retroceso forzado",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10b1a", move: "Nc3", name: null, annotation: null, color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11b1a", move: "Bg7", name: null, annotation: null, color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12b1a", move: "Be3", name: "Sistema Moderno", annotation: "Control del centro", color: "white", opening: "scandinavian", children: [] }
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  id: "scan-7b1b",
                                  move: "Nxc3",
                                  name: null,
                                  annotation: "Intercambio inmediato",
                                  color: "black",
                                  opening: "scandinavian",
                                  children: [
                                    {
                                      id: "scan-8b1b",
                                      move: "bxc3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "scandinavian",
                                      children: [
                                        {
                                          id: "scan-9b1b",
                                          move: "Bg7",
                                          name: null,
                                          annotation: "Fianchetto del alfil",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10b1b", move: "Bd3", name: null, annotation: null, color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11b1b", move: "O-O", name: null, annotation: null, color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12b1b", move: "O-O", name: null, annotation: null, color: "white", opening: "scandinavian", children: [
                                                  { id: "scan-13b1b", move: "Nd7", name: "Moderna con b pawn", annotation: null, color: "black", opening: "scandinavian", children: [] }
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "scan-5b2",
                          move: "e6",
                          name: "Gambito Islandés",
                          annotation: "Sacrificio de peón por actividad",
                          color: "black",
                          opening: "scandinavian",
                          children: [
                            {
                              id: "scan-6b2",
                              move: "dxe6",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "scandinavian",
                              children: [
                                {
                                  id: "scan-7b2",
                                  move: "Bxe6",
                                  name: null,
                                  annotation: "Compensación posicional",
                                  color: "black",
                                  opening: "scandinavian",
                                  children: [
                                    {
                                      id: "scan-8b2",
                                      move: "Nf3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "scandinavian",
                                      children: [
                                        {
                                          id: "scan-9b2",
                                          move: "Nc6",
                                          name: null,
                                          annotation: "Desarrollo con ataque",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10b2", move: "Bb5", name: null, annotation: null, color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11b2", move: "Bd7", name: null, annotation: null, color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12b2", move: "Bxc6", name: null, annotation: null, color: "white", opening: "scandinavian", children: [
                                                  { id: "scan-13b2", move: "Bxc6", name: "Gambito Islandés completo", annotation: null, color: "black", opening: "scandinavian", children: [] }
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ── ESPAÑOLA + ITALIANA (desde e5) ───────────────────────────────
        {
          id: "span-1",
          move: "e5",
          name: "Aperturas Abiertas",
          annotation: "Centro simétrico",
          color: "black",
          opening: "spanish",
          children: [
            {
              id: "span-2",
              move: "Nf3",
              name: null,
              annotation: "Ataca e5",
              color: "white",
              opening: "spanish",
              children: [
                {
                  id: "span-3",
                  move: "Nc6",
                  name: null,
                  annotation: "Defiende e5",
                  color: "black",
                  opening: "spanish",
                  children: [
                    // Ruy López
                    {
                      id: "span-4",
                      move: "Bb5",
                      name: "Ruy López",
                      annotation: "Pina el caballo que defiende e5",
                      color: "white",
                      opening: "spanish",
                      children: [
                        {
                          id: "span-5a",
                          move: "a6",
                          name: "Defensa Morphy",
                          annotation: "Respuesta más común",
                          color: "black",
                          opening: "spanish",
                          children: [
                            {
                              id: "span-6a",
                              move: "Ba4",
                              name: null,
                              annotation: "Mantiene la presión",
                              color: "white",
                              opening: "spanish",
                              children: [
                                {
                                  id: "span-7a1",
                                  move: "Nf6",
                                  name: "Variante Cerrada",
                                  annotation: "La más sólida",
                                  color: "black",
                                  opening: "spanish",
                                  children: [
                                    {
                                      id: "span-8a1",
                                      move: "O-O",
                                      name: null,
                                      annotation: "Enroca y prepara d4",
                                      color: "white",
                                      opening: "spanish",
                                      children: [
                                        {
                                          id: "span-9a1a",
                                          move: "Be7",
                                          name: "Española Cerrada",
                                          annotation: "Sólida y posicional",
                                          color: "black",
                                          opening: "spanish",
                                          children: [
                                            { id: "span-10a1a", move: "d4", name: null, annotation: "El avance central clave", color: "white", opening: "spanish", children: [
                                              { id: "span-11a1a", move: "d6", name: null, annotation: "Cierra el centro", color: "black", opening: "spanish", children: [
                                                { id: "span-12a1a", move: "c3", name: null, annotation: null, color: "white", opening: "spanish", children: [
                                                  { id: "span-13a1a", move: "O-O", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                    { id: "span-14a1a", move: "Nbd2", name: null, annotation: null, color: "white", opening: "spanish", children: [
                                                      { id: "span-15a1a", move: "Nb8", name: null, annotation: "Rerouting the knight", color: "black", opening: "spanish", children: [
                                                        { id: "span-16a1a", move: "Re1", name: "Española Cerrada principal", annotation: "Posición característica", color: "white", opening: "spanish", children: [] }
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "span-9a1b",
                                          move: "b5",
                                          name: "Española Abierta",
                                          annotation: "Activa y táctica",
                                          color: "black",
                                          opening: "spanish",
                                          children: [
                                            { id: "span-10a1b", move: "Ba3", name: null, annotation: "Retira el alfil", color: "white", opening: "spanish", children: [
                                              { id: "span-11a1b", move: "O-O", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                { id: "span-12a1b", move: "d4", name: null, annotation: null, color: "white", opening: "spanish", children: [
                                                  { id: "span-13a1b", move: "exd4", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                    { id: "span-14a1b", move: "cxd4", name: null, annotation: null, color: "white", opening: "spanish", children: [
                                                      { id: "span-15a1b", move: "Nxe4", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                        { id: "span-16a1b", move: "d5", name: "Española Abierta principal", annotation: null, color: "white", opening: "spanish", children: [] }
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              id: "span-6ae",
                              move: "Bxc6",
                              name: "Variante de Cambio",
                              annotation: "Dobla los peones negros",
                              color: "white",
                              opening: "spanish",
                              children: [
                                {
                                  id: "span-7ae",
                                  move: "dxc6",
                                  name: null,
                                  annotation: "Recaptura con el peón",
                                  color: "black",
                                  opening: "spanish",
                                  children: [
                                    {
                                      id: "span-8ae",
                                      move: "Nc3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "spanish",
                                      children: [
                                        {
                                          id: "span-9ae",
                                          move: "f6",
                                          name: null,
                                          annotation: "Defiende e5",
                                          color: "black",
                                          opening: "spanish",
                                          children: [
                                            { id: "span-10ae", move: "d4", name: null, annotation: null, color: "white", opening: "spanish", children: [
                                              { id: "span-11ae", move: "exd4", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                { id: "span-12ae", move: "Qxd4", name: null, annotation: null, color: "white", opening: "spanish", children: [
                                                  { id: "span-13ae", move: "Qxd4", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                    { id: "span-14ae", move: "Nxd4", name: "Cambio con damas", annotation: "Ventaja estructural blanca", color: "white", opening: "spanish", children: [] }
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "span-5b",
                          move: "Nf6",
                          name: "Defensa Berlín",
                          annotation: "El arma del empate",
                          color: "black",
                          opening: "spanish",
                          children: [
                            {
                              id: "span-6b",
                              move: "O-O",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "spanish",
                              children: [
                                {
                                  id: "span-7b",
                                  move: "Nxe4",
                                  name: "Final de Berlín",
                                  annotation: "Favorito de Kramnik",
                                  color: "black",
                                  opening: "spanish",
                                  children: [
                                    {
                                      id: "span-8b",
                                      move: "d4",
                                      name: null,
                                      annotation: "Reclama el centro",
                                      color: "white",
                                      opening: "spanish",
                                      children: [
                                        {
                                          id: "span-9b1",
                                          move: "Nd6",
                                          name: "Berlín Principal",
                                          annotation: "Línea más jugada",
                                          color: "black",
                                          opening: "spanish",
                                          children: [
                                            { id: "span-10b1", move: "Nxe5", name: null, annotation: "Captura el peón", color: "white", opening: "spanish", children: [
                                              { id: "span-11b1", move: "Nxe5", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                { id: "span-12b1", move: "Rxe5+", name: null, annotation: null, color: "white", opening: "spanish", children: [
                                                  { id: "span-13b1", move: "Be7", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                    { id: "span-14b1", move: "d4", name: null, annotation: null, color: "white", opening: "spanish", children: [
                                                      { id: "span-15b1", move: "O-O", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                        { id: "span-16b1", move: "Bd3", name: "Final de Berlín", annotation: "El final más analizado del mundo", color: "white", opening: "spanish", children: [] }
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "span-9b2",
                                          move: "exd4",
                                          name: "Río de Janeiro",
                                          annotation: "Variante aguda",
                                          color: "black",
                                          opening: "spanish",
                                          children: [
                                            { id: "span-10b2", move: "Nxd4", name: null, annotation: null, color: "white", opening: "spanish", children: [
                                              { id: "span-11b2", move: "Nxe4", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                { id: "span-12b2", move: "Rxe4", name: null, annotation: null, color: "white", opening: "spanish", children: [
                                                  { id: "span-13b2", move: "Be7", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                    { id: "span-14b2", move: "Nf5", name: null, annotation: null, color: "white", opening: "spanish", children: [
                                                      { id: "span-15b2", move: "O-O", name: "Río de Janeiro completo", annotation: null, color: "black", opening: "spanish", children: [] }
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "span-5c",
                          move: "f5",
                          name: "Gambito Schliemann",
                          annotation: "Agresivo e irregular",
                          color: "black",
                          opening: "spanish",
                          children: [
                            {
                              id: "span-6c",
                              move: "Nc3",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "spanish",
                              children: [
                                {
                                  id: "span-7c",
                                  move: "fxe4",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "spanish",
                                  children: [
                                    {
                                      id: "span-8c",
                                      move: "Nxe4",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "spanish",
                                      children: [
                                        {
                                          id: "span-9c",
                                          move: "d5",
                                          name: null,
                                          annotation: "Contraataca el centro",
                                          color: "black",
                                          opening: "spanish",
                                          children: [
                                            { id: "span-10c", move: "Ng5", name: null, annotation: "Ataca el peón f7", color: "white", opening: "spanish", children: [
                                              { id: "span-11c", move: "d4", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                { id: "span-12c", move: "exd6", name: null, annotation: null, color: "white", opening: "spanish", children: [
                                                  { id: "span-13c", move: "Qxd6", name: null, annotation: null, color: "black", opening: "spanish", children: [
                                                    { id: "span-14c", move: "Nf3", name: "Schliemann activo", annotation: null, color: "white", opening: "spanish", children: [] }
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },

                    // Italiana
                    {
                      id: "ital-1",
                      move: "Bc4",
                      name: "Italiana",
                      annotation: "Apunta a f7",
                      color: "white",
                      opening: "italian",
                      children: [
                        {
                          id: "ital-2a",
                          move: "Bc5",
                          name: "Giuoco Piano",
                          annotation: "Juego tranquilo",
                          color: "black",
                          opening: "italian",
                          children: [
                            {
                              id: "ital-3a",
                              move: "c3",
                              name: null,
                              annotation: "Prepara d4",
                              color: "white",
                              opening: "italian",
                              children: [
                                {
                                  id: "ital-4a",
                                  move: "Nf6",
                                  name: null,
                                  annotation: "Ataca e4",
                                  color: "black",
                                  opening: "italian",
                                  children: [
                                    {
                                      id: "ital-5a",
                                      move: "d4",
                                      name: null,
                                      annotation: "Abre el centro",
                                      color: "white",
                                      opening: "italian",
                                      children: [
                                        {
                                          id: "ital-6a1",
                                          move: "exd4",
                                          name: "Giuoco Moderno",
                                          annotation: "Acepta el cambio",
                                          color: "black",
                                          opening: "italian",
                                          children: [
                                            { id: "ital-7a1", move: "cxd4", name: null, annotation: null, color: "white", opening: "italian", children: [
                                              { id: "ital-8a1", move: "Bb4+", name: null, annotation: null, color: "black", opening: "italian", children: [
                                                { id: "ital-9a1", move: "Nc3", name: null, annotation: null, color: "white", opening: "italian", children: [
                                                  { id: "ital-10a1", move: "Nxe4", name: null, annotation: null, color: "black", opening: "italian", children: [
                                                    { id: "ital-11a1", move: "O-O", name: null, annotation: null, color: "white", opening: "italian", children: [
                                                      { id: "ital-12a1", move: "Bxc3", name: null, annotation: null, color: "black", opening: "italian", children: [
                                                        { id: "ital-13a1", move: "d5", name: "Giuoco Moderno principal", annotation: null, color: "white", opening: "italian", children: [] }
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "ital-6a2",
                                          move: "Bb6",
                                          name: null,
                                          annotation: "Preserva el alfil",
                                          color: "black",
                                          opening: "italian",
                                          children: [
                                            { id: "ital-7a2", move: "d5", name: null, annotation: "Avance central agresivo", color: "white", opening: "italian", children: [
                                              { id: "ital-8a2", move: "Ne7", name: null, annotation: null, color: "black", opening: "italian", children: [
                                                { id: "ital-9a2", move: "d6", name: null, annotation: null, color: "white", opening: "italian", children: [
                                                  { id: "ital-10a2", move: "Ng6", name: null, annotation: null, color: "black", opening: "italian", children: [
                                                    { id: "ital-11a2", move: "Ng5", name: null, annotation: null, color: "white", opening: "italian", children: [
                                                      { id: "ital-12a2", move: "O-O", name: "Italiana con d5", annotation: null, color: "black", opening: "italian", children: [] }
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "ital-2b",
                          move: "Nf6",
                          name: "Dos Caballos",
                          annotation: "Agresivo, ignora la amenaza",
                          color: "black",
                          opening: "italian",
                          children: [
                            {
                              id: "ital-3b",
                              move: "Ng5",
                              name: null,
                              annotation: "Amenaza Nxf7",
                              color: "white",
                              opening: "italian",
                              children: [
                                {
                                  id: "ital-4b",
                                  move: "d5",
                                  name: null,
                                  annotation: "Única defensa",
                                  color: "black",
                                  opening: "italian",
                                  children: [
                                    {
                                      id: "ital-5b",
                                      move: "exd5",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "italian",
                                      children: [
                                        {
                                          id: "ital-6b1",
                                          move: "Na5",
                                          name: "Variante Knorre",
                                          annotation: "Ataca el alfil",
                                          color: "black",
                                          opening: "italian",
                                          children: [
                                            { id: "ital-7b1", move: "Bb5+", name: null, annotation: null, color: "white", opening: "italian", children: [
                                              { id: "ital-8b1", move: "c6", name: null, annotation: null, color: "black", opening: "italian", children: [
                                                { id: "ital-9b1", move: "dxc6", name: null, annotation: null, color: "white", opening: "italian", children: [
                                                  { id: "ital-10b1", move: "bxc6", name: null, annotation: null, color: "black", opening: "italian", children: [
                                                    { id: "ital-11b1", move: "Bd3", name: null, annotation: null, color: "white", opening: "italian", children: [
                                                      { id: "ital-12b1", move: "d5", name: "Knorre completo", annotation: null, color: "black", opening: "italian", children: [] }
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "ital-6b2",
                                          move: "Nxd5",
                                          name: "Fried Liver",
                                          annotation: "Táctica muy aguda",
                                          color: "black",
                                          opening: "italian",
                                          children: [
                                            { id: "ital-7b2", move: "Nxf7", name: null, annotation: "El sacrificio Fried Liver", color: "white", opening: "italian", children: [
                                              { id: "ital-8b2", move: "Kxf7", name: null, annotation: null, color: "black", opening: "italian", children: [
                                                { id: "ital-9b2", move: "Qf3+", name: null, annotation: null, color: "white", opening: "italian", children: [
                                                  { id: "ital-10b2", move: "Ke6", name: null, annotation: null, color: "black", opening: "italian", children: [
                                                    { id: "ital-11b2", move: "Nc3", name: null, annotation: null, color: "white", opening: "italian", children: [
                                                      { id: "ital-12b2", move: "Ncb4", name: "Fried Liver principal", annotation: "Defensa más sólida", color: "black", opening: "italian", children: [] }
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              id: "ital-3b2",
                              move: "O-O",
                              name: null,
                              annotation: "Enroca primero",
                              color: "white",
                              opening: "italian",
                              children: [
                                {
                                  id: "ital-4b2",
                                  move: "Nxe4",
                                  name: null,
                                  annotation: "Gana el peón",
                                  color: "black",
                                  opening: "italian",
                                  children: [
                                    {
                                      id: "ital-5b2",
                                      move: "Re1",
                                      name: null,
                                      annotation: "Presiona el caballo",
                                      color: "white",
                                      opening: "italian",
                                      children: [
                                        {
                                          id: "ital-6b3",
                                          move: "d5",
                                          name: null,
                                          annotation: "Contraataca",
                                          color: "black",
                                          opening: "italian",
                                          children: [
                                            { id: "ital-7b3", move: "exd5", name: null, annotation: null, color: "white", opening: "italian", children: [
                                              { id: "ital-8b3", move: "Nxd5", name: null, annotation: null, color: "black", opening: "italian", children: [
                                                { id: "ital-9b3", move: "Nxd5", name: null, annotation: null, color: "white", opening: "italian", children: [
                                                  { id: "ital-10b3", move: "Qxd5", name: null, annotation: null, color: "black", opening: "italian", children: [
                                                    { id: "ital-11b3", move: "Re1+", name: null, annotation: null, color: "white", opening: "italian", children: [
                                                      { id: "ital-12b3", move: "Be6", name: "Italiana dos caballos completa", annotation: null, color: "black", opening: "italian", children: [] }
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ── SICILIANA ─────────────────────────────────────────────────────
        {
          id: "sic-1",
          move: "c5",
          name: "Siciliana",
          annotation: "Respuesta más popular a e4",
          color: "black",
          opening: "sicilian",
          children: [
            {
              id: "sic-2",
              move: "Nf3",
              name: null,
              annotation: null,
              color: "white",
              opening: "sicilian",
              children: [
                {
                  id: "sic-3a",
                  move: "d6",
                  name: "Setup Najdorf/Dragón",
                  annotation: null,
                  color: "black",
                  opening: "sicilian",
                  children: [
                    {
                      id: "sic-4a",
                      move: "d4",
                      name: null,
                      annotation: "Siciliana Abierta",
                      color: "white",
                      opening: "sicilian",
                      children: [
                        {
                          id: "sic-5a",
                          move: "cxd4",
                          name: null,
                          annotation: null,
                          color: "black",
                          opening: "sicilian",
                          children: [
                            {
                              id: "sic-6a",
                              move: "Nxd4",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "sicilian",
                              children: [
                                {
                                  id: "sic-7a1",
                                  move: "Nf6",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "sicilian",
                                  children: [
                                    {
                                      id: "sic-8a",
                                      move: "Nc3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "sicilian",
                                      children: [
                                        {
                                          id: "sic-9a1",
                                          move: "a6",
                                          name: "Najdorf",
                                          annotation: "La más jugada del mundo",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            {
                                              id: "sic-10a1",
                                              move: "Bg5",
                                              name: "Ataque Fischer",
                                              annotation: "Clásico de Fischer",
                                              color: "white",
                                              opening: "sicilian",
                                              children: [
                                                { id: "sic-11a1", move: "Nbd7", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                  { id: "sic-12a1", move: "Qf3", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                    { id: "sic-13a1", move: "Qc7", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                      { id: "sic-14a1", move: "O-O-O", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                        { id: "sic-15a1", move: "e6", name: "Fischer-Sozin Najdorf", annotation: "Posición aguda típica", color: "black", opening: "sicilian", children: [] }
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ],
                                            },
                                            {
                                              id: "sic-10a2",
                                              move: "Be3",
                                              name: "Ataque Inglés",
                                              annotation: "Muy popular hoy",
                                              color: "white",
                                              opening: "sicilian",
                                              children: [
                                                { id: "sic-11a2", move: "Nbd7", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                  { id: "sic-12a2", move: "f3", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                    { id: "sic-13a2", move: "e5", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                      { id: "sic-14a2", move: "Nb3", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                        { id: "sic-15a2", move: "b5", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                          { id: "sic-16a2", move: "g4", name: "Inglés Agresivo", annotation: "Ataque de peones", color: "white", opening: "sicilian", children: [] }
                                                        ]}
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ],
                                            },
                                          ],
                                        },
                                        {
                                          id: "sic-9a2",
                                          move: "g6",
                                          name: "Dragón",
                                          annotation: "Alfil en g7, muy aguda",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            {
                                              id: "sic-10a3",
                                              move: "Be3",
                                              name: "Ataque Yugoslavo",
                                              annotation:
                                                "La continuación más agresiva",
                                              color: "white",
                                              opening: "sicilian",
                                              children: [
                                                { id: "sic-11a3", move: "O-O", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                  { id: "sic-12a3", move: "Qd2", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                    { id: "sic-13a3", move: "Nc6", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                      { id: "sic-14a3", move: "O-O-O", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                        { id: "sic-15a3", move: "Ne5", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                          { id: "sic-16a3", move: "h4", name: "Yugoslavo principal", annotation: "Ataque de peones en flanco", color: "white", opening: "sicilian", children: [] }
                                                        ]}
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ],
                                            },
                                            {
                                              id: "sic-10a4",
                                              move: "f3",
                                              name: "Dragón Clásico",
                                              annotation: "Más posicional",
                                              color: "white",
                                              opening: "sicilian",
                                              children: [
                                                { id: "sic-11a4", move: "Nc6", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                  { id: "sic-12a4", move: "Bc4", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                    { id: "sic-13a4", move: "Bd7", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                      { id: "sic-14a4", move: "Bb3", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                        { id: "sic-15a4", move: "Rb8", name: "Dragón Clásico línea principal", annotation: null, color: "black", opening: "sicilian", children: [] }
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ],
                                            },
                                          ],
                                        },
                                        {
                                          id: "sic-9a3",
                                          move: "e6",
                                          name: "Scheveningen",
                                          annotation:
                                            "Estructura flexible e6+d6",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            {
                                              id: "sic-10a5",
                                              move: "g4",
                                              name: "Ataque Keres",
                                              annotation: "Muy agresivo",
                                              color: "white",
                                              opening: "sicilian",
                                              children: [
                                                { id: "sic-11a5", move: "h6", name: null, annotation: "Frena g5", color: "black", opening: "sicilian", children: [
                                                  { id: "sic-12a5", move: "h4", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                    { id: "sic-13a5", move: "Nc6", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                      { id: "sic-14a5", move: "Rg1", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                        { id: "sic-15a5", move: "d5", name: "Keres contragolpe", annotation: null, color: "black", opening: "sicilian", children: [] }
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ],
                                            },
                                            {
                                              id: "sic-10a6",
                                              move: "Be2",
                                              name: "Línea Clásica",
                                              annotation: "Sólido y flexible",
                                              color: "white",
                                              opening: "sicilian",
                                              children: [
                                                { id: "sic-11a6", move: "Be7", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                  { id: "sic-12a6", move: "O-O", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                    { id: "sic-13a6", move: "O-O", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                      { id: "sic-14a6", move: "f4", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                        { id: "sic-15a6", move: "Qc7", name: "Scheveningen Clásica completa", annotation: null, color: "black", opening: "sicilian", children: [] }
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "sic-3b",
                  move: "Nc6",
                  name: "Setup Clásico/Taimanov",
                  annotation: null,
                  color: "black",
                  opening: "sicilian",
                  children: [
                    {
                      id: "sic-4b",
                      move: "d4",
                      name: null,
                      annotation: null,
                      color: "white",
                      opening: "sicilian",
                      children: [
                        {
                          id: "sic-5b",
                          move: "cxd4",
                          name: null,
                          annotation: null,
                          color: "black",
                          opening: "sicilian",
                          children: [
                            {
                              id: "sic-6b",
                              move: "Nxd4",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "sicilian",
                              children: [
                                {
                                  id: "sic-7b1",
                                  move: "Nf6",
                                  name: "Clásica",
                                  annotation: null,
                                  color: "black",
                                  opening: "sicilian",
                                  children: [
                                    {
                                      id: "sic-8b1",
                                      move: "Nc3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "sicilian",
                                      children: [
                                        {
                                          id: "sic-9b1a",
                                          move: "d6",
                                          name: null,
                                          annotation: "Posición sólida",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10b1a", move: "Be2", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                              { id: "sic-11b1a", move: "e5", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                { id: "sic-12b1a", move: "Nb3", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13b1a", move: "Be6", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14b1a", move: "Be3", name: "Clásica con d6", annotation: null, color: "white", opening: "sicilian", children: [] }
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "sic-9b1b",
                                          move: "e5",
                                          name: "Sveshnikov",
                                          annotation: "Agresiva, debilita d5",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10b1b", move: "Ndb5", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                              { id: "sic-11b1b", move: "d6", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                { id: "sic-12b1b", move: "Nd5", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13b1b", move: "Nxd5", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14b1b", move: "exd5", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                      { id: "sic-15b1b", move: "Ne7", name: "Sveshnikov principal", annotation: "El caballo se redirige", color: "black", opening: "sicilian", children: [] }
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  id: "sic-7b2",
                                  move: "e6",
                                  name: "Taimanov",
                                  annotation: "Flexible y sólida",
                                  color: "black",
                                  opening: "sicilian",
                                  children: [
                                    {
                                      id: "sic-8b2",
                                      move: "Nc3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "sicilian",
                                      children: [
                                        {
                                          id: "sic-9b2a",
                                          move: "Nf6",
                                          name: null,
                                          annotation: "Desarrollo normal",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10b2a", move: "Ndb5", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                              { id: "sic-11b2a", move: "d6", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                { id: "sic-12b2a", move: "Bf4", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13b2a", move: "e5", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14b2a", move: "Bg5", name: "Taimanov-Kan mezclado", annotation: null, color: "white", opening: "sicilian", children: [] }
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "sic-9b2b",
                                          move: "a6",
                                          name: null,
                                          annotation: "Prepara b5",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10b2b", move: "Ndb5", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                              { id: "sic-11b2b", move: "axb5", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                { id: "sic-12b2b", move: "Nxb5", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13b2b", move: "Bb4", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14b2b", move: "Bd2", name: "Taimanov agresivo", annotation: null, color: "white", opening: "sicilian", children: [] }
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "sic-3c",
                  move: "e6",
                  name: "Setup Kan/Scheveningen",
                  annotation: null,
                  color: "black",
                  opening: "sicilian",
                  children: [
                    {
                      id: "sic-4c",
                      move: "d4",
                      name: null,
                      annotation: null,
                      color: "white",
                      opening: "sicilian",
                      children: [
                        {
                          id: "sic-5c",
                          move: "cxd4",
                          name: null,
                          annotation: null,
                          color: "black",
                          opening: "sicilian",
                          children: [
                            {
                              id: "sic-6c",
                              move: "Nxd4",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "sicilian",
                              children: [
                                {
                                  id: "sic-7c1",
                                  move: "a6",
                                  name: "Kan",
                                  annotation: "Muy flexible",
                                  color: "black",
                                  opening: "sicilian",
                                  children: [
                                    {
                                      id: "sic-8c1",
                                      move: "Nc3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "sicilian",
                                      children: [
                                        {
                                          id: "sic-9c1a",
                                          move: "Qc7",
                                          name: "Kan Principal",
                                          annotation: "Protege y desarrolla",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10c1a", move: "Be2", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                              { id: "sic-11c1a", move: "Nf6", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                { id: "sic-12c1a", move: "O-O", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13c1a", move: "Be7", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14c1a", move: "Be3", name: "Kan Clásica", annotation: null, color: "white", opening: "sicilian", children: [] }
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "sic-9c1b",
                                          move: "b5",
                                          name: "Kan Agresivo",
                                          annotation: "Avance de flanco",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10c1b", move: "Bd3", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                              { id: "sic-11c1b", move: "Bb7", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                { id: "sic-12c1b", move: "O-O", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13c1b", move: "Nf6", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14c1b", move: "Kh1", name: "Kan con b5", annotation: null, color: "white", opening: "sicilian", children: [] }
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  id: "sic-7c2",
                                  move: "Nf6",
                                  name: "Scheveningen",
                                  annotation: "Estructura e6+d6",
                                  color: "black",
                                  opening: "sicilian",
                                  children: [
                                    {
                                      id: "sic-8c2",
                                      move: "Nc3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "sicilian",
                                      children: [
                                        {
                                          id: "sic-9c2a",
                                          move: "d6",
                                          name: "Scheveningen Clásica",
                                          annotation: "La estructura más común",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10c2a", move: "Be2", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                              { id: "sic-11c2a", move: "Nf6", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                { id: "sic-12c2a", move: "O-O", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13c2a", move: "Be7", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14c2a", move: "f4", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                      { id: "sic-15c2a", move: "O-O", name: "Scheveningen completa", annotation: null, color: "black", opening: "sicilian", children: [] }
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "sic-9c2b",
                                          move: "Bb4",
                                          name: "Siciliana Nimzovich",
                                          annotation: "Clava al caballo",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10c2b", move: "Bd3", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                              { id: "sic-11c2b", move: "Bxc3+", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                { id: "sic-12c2b", move: "bxc3", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13c2b", move: "Nf6", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14c2b", move: "O-O", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                      { id: "sic-15c2b", move: "d6", name: "Nimzovich completa", annotation: null, color: "black", opening: "sicilian", children: [] }
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: "sic-2b",
              move: "Nc3",
              name: "Siciliana Cerrada",
              annotation: "Evita la apertura del centro",
              color: "white",
              opening: "sicilian",
              children: [
                {
                  id: "sic-3d",
                  move: "Nc6",
                  name: null,
                  annotation: null,
                  color: "black",
                  opening: "sicilian",
                  children: [
                    {
                      id: "sic-4d",
                      move: "g3",
                      name: null,
                      annotation: "Fianchetto del alfil",
                      color: "white",
                      opening: "sicilian",
                      children: [
                        {
                          id: "sic-5d",
                          move: "g6",
                          name: null,
                          annotation: "Fianchetto simétrico",
                          color: "black",
                          opening: "sicilian",
                          children: [
                            {
                              id: "sic-6d",
                              move: "Bg2",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "sicilian",
                              children: [
                                {
                                  id: "sic-7d",
                                  move: "Bg7",
                                  name: "Cerrada con Fianchetto",
                                  annotation: "Partida posicional",
                                  color: "black",
                                  opening: "sicilian",
                                  children: [
                                    {
                                      id: "sic-8d",
                                      move: "d3",
                                      name: null,
                                      annotation: "Clásico de Grand Prix",
                                      color: "white",
                                      opening: "sicilian",
                                      children: [
                                        {
                                          id: "sic-9d",
                                          move: "d6",
                                          name: null,
                                          annotation: "Prepara e5 o Nf6",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10d", move: "Be3", name: null, annotation: "Refuerza el centro", color: "white", opening: "sicilian", children: [
                                              { id: "sic-11d", move: "e6", name: null, annotation: "Prepara d5", color: "black", opening: "sicilian", children: [
                                                { id: "sic-12d", move: "Nge2", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13d", move: "Nge7", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14d", move: "O-O", name: null, annotation: null, color: "white", opening: "sicilian", children: [
                                                      { id: "sic-15d", move: "O-O", name: null, annotation: null, color: "black", opening: "sicilian", children: [
                                                        { id: "sic-16da", move: "Rb1", name: "Cerrada flanco de dama", annotation: "Ataque en flanco de dama", color: "white", opening: "sicilian", children: [] },
                                                        { id: "sic-16db", move: "Nd5", name: "Cerrada central", annotation: "Salto de caballo al centro", color: "white", opening: "sicilian", children: [] }
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ── FRANCESA ─────────────────────────────────────────────────────
        {
          id: "fr-1",
          move: "e6",
          name: "Defensa Francesa",
          annotation: "Segunda respuesta más jugada a 1.e4",
          color: "black",
          opening: "french",
          children: [
            {
              id: "fr-2",
              move: "d4",
              name: null,
              annotation: "Controla el centro",
              color: "white",
              opening: "french",
              children: [
                {
                  id: "fr-3",
                  move: "d5",
                  name: null,
                  annotation: "Desafía el centro blanco",
                  color: "black",
                  opening: "french",
                  children: [
                    {
                      id: "fr-4a",
                      move: "e5",
                      name: "Variante Avance",
                      annotation: "Gana espacio, cierra el centro",
                      color: "white",
                      opening: "french",
                      children: [
                        {
                          id: "fr-5a",
                          move: "c5",
                          name: null,
                          annotation: "Ataca la base de la cadena",
                          color: "black",
                          opening: "french",
                          children: [
                            {
                              id: "fr-6a",
                              move: "c3",
                              name: null,
                              annotation: "Refuerza d4",
                              color: "white",
                              opening: "french",
                              children: [
                                {
                                  id: "fr-7a",
                                  move: "Nc6",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "french",
                                  children: [
                                    {
                                      id: "fr-8a",
                                      move: "Nf3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "french",
                                      children: [
                                        {
                                          id: "fr-9a",
                                          move: "Qb6",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "french",
                                          children: [
                                            {
                                              id: "fr-10a",
                                              move: "Nbd2",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "french",
                                              children: [
                                                {
                                                  id: "fr-11a",
                                                  move: "cxd4",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "french",
                                                  children: [
                                                    {
                                                      id: "fr-12a",
                                                      move: "cxd4",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "french",
                                                      children: [
                                                        {
                                                          id: "fr-13a",
                                                          move: "Bb4",
                                                          name: "Avance principal",
                                                          annotation: "Clavada al caballo",
                                                          color: "black",
                                                          opening: "french",
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "fr-4b",
                      move: "exd5",
                      name: "Variante Cambio",
                      annotation: "Simplifica el centro",
                      color: "white",
                      opening: "french",
                      children: [
                        {
                          id: "fr-5b",
                          move: "exd5",
                          name: null,
                          annotation: null,
                          color: "black",
                          opening: "french",
                          children: [
                            {
                              id: "fr-6b",
                              move: "Nf3",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "french",
                              children: [
                                {
                                  id: "fr-7b",
                                  move: "Nf6",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "french",
                                  children: [
                                    {
                                      id: "fr-8b",
                                      move: "Bd3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "french",
                                      children: [
                                        {
                                          id: "fr-9b",
                                          move: "Bd6",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "french",
                                          children: [
                                            {
                                              id: "fr-10b",
                                              move: "Qe2+",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "french",
                                              children: [
                                                {
                                                  id: "fr-11b",
                                                  move: "Qe7",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "french",
                                                  children: [
                                                    {
                                                      id: "fr-12b",
                                                      move: "Qxe7+",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "french",
                                                      children: [
                                                        {
                                                          id: "fr-13b",
                                                          move: "Kxe7",
                                                          name: "Cambio típico",
                                                          annotation: "Final igualado",
                                                          color: "black",
                                                          opening: "french",
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "fr-4c",
                      move: "Nc3",
                      name: null,
                      annotation: "La jugada más popular en élite",
                      color: "white",
                      opening: "french",
                      children: [
                        {
                          id: "fr-5c1",
                          move: "Bb4",
                          name: "Winawer",
                          annotation: "Clava el caballo, crea tensión",
                          color: "black",
                          opening: "french",
                          children: [
                            {
                              id: "fr-6c1",
                              move: "e5",
                              name: "Winawer Avance",
                              annotation: "La línea más aguda",
                              color: "white",
                              opening: "french",
                              children: [
                                {
                                  id: "fr-7c1",
                                  move: "c5",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "french",
                                  children: [
                                    {
                                      id: "fr-8c1",
                                      move: "a3",
                                      name: null,
                                      annotation: "Fuerza la decisión del alfil",
                                      color: "white",
                                      opening: "french",
                                      children: [
                                        {
                                          id: "fr-9c1",
                                          move: "Bxc3+",
                                          name: null,
                                          annotation: "Dobla los peones blancos",
                                          color: "black",
                                          opening: "french",
                                          children: [
                                            {
                                              id: "fr-10c1",
                                              move: "bxc3",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "french",
                                              children: [
                                                {
                                                  id: "fr-11c1",
                                                  move: "Ne7",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "french",
                                                  children: [
                                                    {
                                                      id: "fr-12c1",
                                                      move: "Qg4",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "french",
                                                      children: [
                                                        {
                                                          id: "fr-13c1",
                                                          move: "Nf5",
                                                          name: "Winawer principal",
                                                          annotation: "Posición muy compleja",
                                                          color: "black",
                                                          opening: "french",
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "fr-5c2",
                          move: "Nf6",
                          name: "Clásica",
                          annotation: "Desarrollo normal",
                          color: "black",
                          opening: "french",
                          children: [
                            {
                              id: "fr-6c2",
                              move: "e5",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "french",
                              children: [
                                {
                                  id: "fr-7c2",
                                  move: "Nfd7",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "french",
                                  children: [
                                    {
                                      id: "fr-8c2",
                                      move: "f4",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "french",
                                      children: [
                                        {
                                          id: "fr-9c2",
                                          move: "c5",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "french",
                                          children: [
                                            {
                                              id: "fr-10c2",
                                              move: "Nf3",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "french",
                                              children: [
                                                {
                                                  id: "fr-11c2",
                                                  move: "Nc6",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "french",
                                                  children: [
                                                    {
                                                      id: "fr-12c2",
                                                      move: "Be3",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "french",
                                                      children: [
                                                        {
                                                          id: "fr-13c2",
                                                          move: "cxd4",
                                                          name: "Clásica principal",
                                                          annotation: null,
                                                          color: "black",
                                                          opening: "french",
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "fr-4d",
                      move: "Nd2",
                      name: "Variante Tarrasch",
                      annotation: "Evita la clavada Bb4",
                      color: "white",
                      opening: "french",
                      children: [
                        {
                          id: "fr-5d1",
                          move: "c5",
                          name: "Tarrasch Abierta",
                          annotation: "Doble ataque al centro",
                          color: "black",
                          opening: "french",
                          children: [
                            {
                              id: "fr-6d1",
                              move: "exd5",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "french",
                              children: [
                                {
                                  id: "fr-7d1",
                                  move: "exd5",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "french",
                                  children: [
                                    {
                                      id: "fr-8d1",
                                      move: "Ngf3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "french",
                                      children: [
                                        {
                                          id: "fr-9d1",
                                          move: "Nc6",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "french",
                                          children: [
                                            {
                                              id: "fr-10d1",
                                              move: "Bb5",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "french",
                                              children: [
                                                {
                                                  id: "fr-11d1",
                                                  move: "Bd6",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "french",
                                                  children: [
                                                    {
                                                      id: "fr-12d1",
                                                      move: "O-O",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "french",
                                                      children: [
                                                        {
                                                          id: "fr-13d1",
                                                          move: "O-O",
                                                          name: "Tarrasch Abierta completa",
                                                          annotation: null,
                                                          color: "black",
                                                          opening: "french",
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: "fr-5d2",
                          move: "Nf6",
                          name: "Tarrasch Cerrada",
                          annotation: "Desarrollo normal",
                          color: "black",
                          opening: "french",
                          children: [
                            {
                              id: "fr-6d2",
                              move: "e5",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "french",
                              children: [
                                {
                                  id: "fr-7d2",
                                  move: "Nfd7",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "french",
                                  children: [
                                    {
                                      id: "fr-8d2",
                                      move: "Bd3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "french",
                                      children: [
                                        {
                                          id: "fr-9d2",
                                          move: "c5",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "french",
                                          children: [
                                            {
                                              id: "fr-10d2",
                                              move: "c3",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "french",
                                              children: [
                                                {
                                                  id: "fr-11d2",
                                                  move: "Nc6",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "french",
                                                  children: [
                                                    {
                                                      id: "fr-12d2",
                                                      move: "Ne2",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "french",
                                                      children: [
                                                        {
                                                          id: "fr-13d2",
                                                          move: "cxd4",
                                                          name: "Tarrasch Cerrada completa",
                                                          annotation: null,
                                                          color: "black",
                                                          opening: "french",
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ── CARO-KANN ──────────────────────────────────────────────────────
        {
          id: "ck-1",
          move: "c6",
          name: "Caro-Kann",
          annotation: "Defensa sólida y posicional",
          color: "black",
          opening: "caro_kann",
          children: [
            {
              id: "ck-2",
              move: "d4",
              name: null,
              annotation: null,
              color: "white",
              opening: "caro_kann",
              children: [
                {
                  id: "ck-3",
                  move: "d5",
                  name: null,
                  annotation: "Crea tensión en el centro",
                  color: "black",
                  opening: "caro_kann",
                  children: [
                    {
                      id: "ck-4a",
                      move: "Nc3",
                      name: "Línea Clásica",
                      annotation: "El enfoque más popular",
                      color: "white",
                      opening: "caro_kann",
                      children: [
                        {
                          id: "ck-5a",
                          move: "dxe4",
                          name: null,
                          annotation: null,
                          color: "black",
                          opening: "caro_kann",
                          children: [
                            {
                              id: "ck-6a",
                              move: "Nxe4",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "caro_kann",
                              children: [
                                {
                                  id: "ck-7a",
                                  move: "Bf5",
                                  name: "Clásica principal",
                                  annotation: "El alfil se activa antes de Nd7",
                                  color: "black",
                                  opening: "caro_kann",
                                  children: [
                                    {
                                      id: "ck-8a",
                                      move: "Ng3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "caro_kann",
                                      children: [
                                        {
                                          id: "ck-9a",
                                          move: "Bg6",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "caro_kann",
                                          children: [
                                            {
                                              id: "ck-10a",
                                              move: "h4",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "caro_kann",
                                              children: [
                                                {
                                                  id: "ck-11a",
                                                  move: "h6",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "caro_kann",
                                                  children: [
                                                    {
                                                      id: "ck-12a",
                                                      move: "Nf3",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "caro_kann",
                                                      children: [
                                                        {
                                                          id: "ck-13a",
                                                          move: "Nd7",
                                                          name: null,
                                                          annotation: null,
                                                          color: "black",
                                                          opening: "caro_kann",
                                                          children: [
                                                            {
                                                              id: "ck-14a",
                                                              move: "Bd3",
                                                              name: null,
                                                              annotation: null,
                                                              color: "white",
                                                              opening: "caro_kann",
                                                              children: [
                                                                {
                                                                  id: "ck-15a",
                                                                  move: "Bxd3",
                                                                  name: null,
                                                                  annotation: null,
                                                                  color: "black",
                                                                  opening: "caro_kann",
                                                                  children: [
                                                                    {
                                                                      id: "ck-16a",
                                                                      move: "Qxd3",
                                                                      name: "Caro-Kann Clásica completa",
                                                                      annotation: null,
                                                                      color: "white",
                                                                      opening: "caro_kann",
                                                                      children: [],
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "ck-4b",
                      move: "e5",
                      name: "Variante Avance",
                      annotation: "Gana espacio, restringe al negro",
                      color: "white",
                      opening: "caro_kann",
                      children: [
                        {
                          id: "ck-5b",
                          move: "Bf5",
                          name: null,
                          annotation: "Desarrolla el alfil antes de e6",
                          color: "black",
                          opening: "caro_kann",
                          children: [
                            {
                              id: "ck-6b",
                              move: "Nf3",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "caro_kann",
                              children: [
                                {
                                  id: "ck-7b",
                                  move: "e6",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "caro_kann",
                                  children: [
                                    {
                                      id: "ck-8b",
                                      move: "Be2",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "caro_kann",
                                      children: [
                                        {
                                          id: "ck-9b",
                                          move: "Ne7",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "caro_kann",
                                          children: [
                                            {
                                              id: "ck-10b",
                                              move: "O-O",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "caro_kann",
                                              children: [
                                                {
                                                  id: "ck-11b",
                                                  move: "h6",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "caro_kann",
                                                  children: [
                                                    {
                                                      id: "ck-12b",
                                                      move: "Nbd2",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "caro_kann",
                                                      children: [
                                                        {
                                                          id: "ck-13b",
                                                          move: "Nf5",
                                                          name: "Avance Caro-Kann completo",
                                                          annotation: null,
                                                          color: "black",
                                                          opening: "caro_kann",
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "ck-4c",
                      move: "exd5",
                      name: "Variante Cambio",
                      annotation: "Simplifica, facilita tablas",
                      color: "white",
                      opening: "caro_kann",
                      children: [
                        {
                          id: "ck-5c",
                          move: "cxd5",
                          name: null,
                          annotation: null,
                          color: "black",
                          opening: "caro_kann",
                          children: [
                            {
                              id: "ck-6c",
                              move: "Bd3",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "caro_kann",
                              children: [
                                {
                                  id: "ck-7c",
                                  move: "Nc6",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "caro_kann",
                                  children: [
                                    {
                                      id: "ck-8c",
                                      move: "c3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "caro_kann",
                                      children: [
                                        {
                                          id: "ck-9c",
                                          move: "Nf6",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "caro_kann",
                                          children: [
                                            {
                                              id: "ck-10c",
                                              move: "Bf4",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "caro_kann",
                                              children: [
                                                {
                                                  id: "ck-11c",
                                                  move: "Bg4",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "caro_kann",
                                                  children: [
                                                    {
                                                      id: "ck-12c",
                                                      move: "Nf3",
                                                      name: "Cambio Caro-Kann completo",
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "caro_kann",
                                                      children: [],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "ck-4d",
                      move: "f3",
                      name: "Variante Fantasía",
                      annotation: "Agresivo, busca centro masivo",
                      color: "white",
                      opening: "caro_kann",
                      children: [
                        {
                          id: "ck-5d",
                          move: "e6",
                          name: null,
                          annotation: null,
                          color: "black",
                          opening: "caro_kann",
                          children: [
                            {
                              id: "ck-6d",
                              move: "Nc3",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "caro_kann",
                              children: [
                                {
                                  id: "ck-7d",
                                  move: "Bb4",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "caro_kann",
                                  children: [
                                    {
                                      id: "ck-8d",
                                      move: "Be3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "caro_kann",
                                      children: [
                                        {
                                          id: "ck-9d",
                                          move: "Ne7",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "caro_kann",
                                          children: [
                                            {
                                              id: "ck-10d",
                                              move: "O-O-O",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "caro_kann",
                                              children: [
                                                {
                                                  id: "ck-11d",
                                                  move: "Bxc3",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "caro_kann",
                                                  children: [
                                                    {
                                                      id: "ck-12d",
                                                      move: "Qxc3",
                                                      name: "Fantasía completa",
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "caro_kann",
                                                      children: [],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ── PIRC ────────────────────────────────────────────────────────────
        {
          id: "pirc-1",
          move: "d6",
          name: "Pirc",
          annotation: "Defensa hipermoderna, cede el centro",
          color: "black",
          opening: "pirc",
          children: [
            {
              id: "pirc-2",
              move: "d4",
              name: null,
              annotation: null,
              color: "white",
              opening: "pirc",
              children: [
                {
                  id: "pirc-3",
                  move: "Nf6",
                  name: null,
                  annotation: null,
                  color: "black",
                  opening: "pirc",
                  children: [
                    {
                      id: "pirc-4",
                      move: "Nc3",
                      name: null,
                      annotation: null,
                      color: "white",
                      opening: "pirc",
                      children: [
                        {
                          id: "pirc-5",
                          move: "g6",
                          name: null,
                          annotation: "Fiancheto del alfil de rey",
                          color: "black",
                          opening: "pirc",
                          children: [
                            {
                              id: "pirc-6a",
                              move: "f4",
                              name: "Ataque Austriaco",
                              annotation: "El más agresivo, busca f5",
                              color: "white",
                              opening: "pirc",
                              children: [
                                {
                                  id: "pirc-7a",
                                  move: "Bg7",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "pirc",
                                  children: [
                                    {
                                      id: "pirc-8a",
                                      move: "Nf3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "pirc",
                                      children: [
                                        {
                                          id: "pirc-9a",
                                          move: "O-O",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "pirc",
                                          children: [
                                            {
                                              id: "pirc-10a",
                                              move: "Be2",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "pirc",
                                              children: [
                                                {
                                                  id: "pirc-11a",
                                                  move: "c5",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "pirc",
                                                  children: [
                                                    {
                                                      id: "pirc-12a",
                                                      move: "dxc5",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "pirc",
                                                      children: [
                                                        {
                                                          id: "pirc-13a",
                                                          move: "dxc5",
                                                          name: null,
                                                          annotation: null,
                                                          color: "black",
                                                          opening: "pirc",
                                                          children: [
                                                            {
                                                              id: "pirc-14a",
                                                              move: "O-O",
                                                              name: "Austriaco completo",
                                                              annotation: null,
                                                              color: "white",
                                                              opening: "pirc",
                                                              children: [],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              id: "pirc-6b",
                              move: "Nf3",
                              name: "Sistema Clásico",
                              annotation: "Desarrollo tranquilo",
                              color: "white",
                              opening: "pirc",
                              children: [
                                {
                                  id: "pirc-7b",
                                  move: "Bg7",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "pirc",
                                  children: [
                                    {
                                      id: "pirc-8b",
                                      move: "Be2",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "pirc",
                                      children: [
                                        {
                                          id: "pirc-9b",
                                          move: "O-O",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "pirc",
                                          children: [
                                            {
                                              id: "pirc-10b",
                                              move: "O-O",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "pirc",
                                              children: [
                                                {
                                                  id: "pirc-11b",
                                                  move: "c6",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "pirc",
                                                  children: [
                                                    {
                                                      id: "pirc-12b",
                                                      move: "a4",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "pirc",
                                                      children: [
                                                        {
                                                          id: "pirc-13b",
                                                          move: "Nbd7",
                                                          name: null,
                                                          annotation: null,
                                                          color: "black",
                                                          opening: "pirc",
                                                          children: [
                                                            {
                                                              id: "pirc-14b",
                                                              move: "h3",
                                                              name: "Pirc Clásico completo",
                                                              annotation: null,
                                                              color: "white",
                                                              opening: "pirc",
                                                              children: [],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              id: "pirc-6c",
                              move: "Be3",
                              name: "Ataque 150",
                              annotation: "Nombre informal, muy agresivo",
                              color: "white",
                              opening: "pirc",
                              children: [
                                {
                                  id: "pirc-7c",
                                  move: "Bg7",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "pirc",
                                  children: [
                                    {
                                      id: "pirc-8c",
                                      move: "Qd2",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "pirc",
                                      children: [
                                        {
                                          id: "pirc-9c",
                                          move: "O-O",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "pirc",
                                          children: [
                                            {
                                              id: "pirc-10c",
                                              move: "O-O-O",
                                              name: null,
                                              annotation: "Enroques opuestos, tensión",
                                              color: "white",
                                              opening: "pirc",
                                              children: [
                                                {
                                                  id: "pirc-11c",
                                                  move: "c6",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "pirc",
                                                  children: [
                                                    {
                                                      id: "pirc-12c",
                                                      move: "h4",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "pirc",
                                                      children: [
                                                        {
                                                          id: "pirc-13c",
                                                          move: "b5",
                                                          name: "Ataque 150 completo",
                                                          annotation: "Contrataque en flanco de dama",
                                                          color: "black",
                                                          opening: "pirc",
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ── ALEKHINE ────────────────────────────────────────────────────────
        {
          id: "al-1",
          move: "Nf6",
          name: "Alekhine",
          annotation: "Provoca el avance blanco para atacarlo",
          color: "black",
          opening: "alekhine",
          children: [
            {
              id: "al-2",
              move: "e5",
              name: null,
              annotation: "Acepta el reto, gana espacio",
              color: "white",
              opening: "alekhine",
              children: [
                {
                  id: "al-3",
                  move: "Nd5",
                  name: null,
                  annotation: "El caballo se retira con plan futuro",
                  color: "black",
                  opening: "alekhine",
                  children: [
                    {
                      id: "al-4",
                      move: "d4",
                      name: null,
                      annotation: null,
                      color: "white",
                      opening: "alekhine",
                      children: [
                        {
                          id: "al-5",
                          move: "d6",
                          name: null,
                          annotation: "Ataca la cadena de peones",
                          color: "black",
                          opening: "alekhine",
                          children: [
                            {
                              id: "al-6a",
                              move: "Nf3",
                              name: "Variante Moderna",
                              annotation: "Desarrollo sólido",
                              color: "white",
                              opening: "alekhine",
                              children: [
                                {
                                  id: "al-7a",
                                  move: "dxe5",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "alekhine",
                                  children: [
                                    {
                                      id: "al-8a",
                                      move: "Nxe5",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "alekhine",
                                      children: [
                                        {
                                          id: "al-9a",
                                          move: "Nd7",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "alekhine",
                                          children: [
                                            {
                                              id: "al-10a",
                                              move: "Nf3",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "alekhine",
                                              children: [
                                                {
                                                  id: "al-11a",
                                                  move: "e6",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "alekhine",
                                                  children: [
                                                    {
                                                      id: "al-12a",
                                                      move: "Be2",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "alekhine",
                                                      children: [
                                                        {
                                                          id: "al-13a",
                                                          move: "Be7",
                                                          name: "Alekhine Moderna completa",
                                                          annotation: null,
                                                          color: "black",
                                                          opening: "alekhine",
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              id: "al-6b",
                              move: "c4",
                              name: "Variante Cambio",
                              annotation: "Ataca el caballo en d5",
                              color: "white",
                              opening: "alekhine",
                              children: [
                                {
                                  id: "al-7b",
                                  move: "Nb6",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "alekhine",
                                  children: [
                                    {
                                      id: "al-8b",
                                      move: "exd6",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "alekhine",
                                      children: [
                                        {
                                          id: "al-9b",
                                          move: "exd6",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "alekhine",
                                          children: [
                                            {
                                              id: "al-10b",
                                              move: "Nc3",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "alekhine",
                                              children: [
                                                {
                                                  id: "al-11b",
                                                  move: "Be7",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "alekhine",
                                                  children: [
                                                    {
                                                      id: "al-12b",
                                                      move: "Nf3",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "alekhine",
                                                      children: [
                                                        {
                                                          id: "al-13b",
                                                          move: "O-O",
                                                          name: "Alekhine Cambio completo",
                                                          annotation: null,
                                                          color: "black",
                                                          opening: "alekhine",
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              id: "al-6c",
                              move: "f4",
                              name: "Variante Cuatro Peones",
                              annotation: "El más agresivo, cadena de peones masiva",
                              color: "white",
                              opening: "alekhine",
                              children: [
                                {
                                  id: "al-7c",
                                  move: "dxe5",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "alekhine",
                                  children: [
                                    {
                                      id: "al-8c",
                                      move: "fxe5",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "alekhine",
                                      children: [
                                        {
                                          id: "al-9c",
                                          move: "Nc6",
                                          name: null,
                                          annotation: "Ataca el centro blanco",
                                          color: "black",
                                          opening: "alekhine",
                                          children: [
                                            {
                                              id: "al-10c",
                                              move: "Nf3",
                                              name: null,
                                              annotation: null,
                                              color: "white",
                                              opening: "alekhine",
                                              children: [
                                                {
                                                  id: "al-11c",
                                                  move: "Bg4",
                                                  name: null,
                                                  annotation: null,
                                                  color: "black",
                                                  opening: "alekhine",
                                                  children: [
                                                    {
                                                      id: "al-12c",
                                                      move: "Be2",
                                                      name: null,
                                                      annotation: null,
                                                      color: "white",
                                                      opening: "alekhine",
                                                      children: [
                                                        {
                                                          id: "al-13c",
                                                          move: "e6",
                                                          name: "Cuatro Peones completo",
                                                          annotation: null,
                                                          color: "black",
                                                          opening: "alekhine",
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // ── PEÓN DE DAMA (d4) ────────────────────────────────────────────────
    {
      id: "d4",
      move: "d4",
      name: "Peón de Dama",
      annotation: "Control del centro, apertura posicional",
      color: "white",
      opening: "root",
      children: [
        // ── GAMBITO DE DAMA ────────────────────────────────────────────────
        {
          id: "qg-1",
          move: "d5",
          name: "Defensa de Peón de Dama",
          annotation: "Respuesta simétrica al centro",
          color: "black",
          opening: "queens_gambit",
          children: [
            {
              id: "qg-2",
              move: "c4",
              name: "Gambito de Dama",
              annotation: "Ofrece el peón por el control del centro",
              color: "white",
              opening: "queens_gambit",
              children: [
                {
                  id: "qg-3a",
                  move: "dxc4",
                  name: "Gambito de Dama Aceptado",
                  annotation:
                    "Acepta el gambito; las blancas recuperan el peón",
                  color: "black",
                  opening: "queens_gambit",
                  children: [
                    {
                      id: "qg-4a",
                      move: "Nf3",
                      name: null,
                      annotation: "Desarrollo y amenaza recuperar el peón",
                      color: "white",
                      opening: "queens_gambit",
                      children: [
                        {
                          id: "qg-5a",
                          move: "Nf6",
                          name: null,
                          annotation: "Desarrollo normal",
                          color: "black",
                          opening: "queens_gambit",
                          children: [
                            {
                              id: "qg-6a1",
                              move: "e3",
                              name: "GDA Clásico",
                              annotation: "Sólida recuperación del peón",
                              color: "white",
                              opening: "queens_gambit",
                              children: [
                                { id: "qg-7a1", move: "e6", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                  { id: "qg-8a1", move: "Bxc4", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                    { id: "qg-9a1", move: "c5", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                      { id: "qg-10a1", move: "O-O", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                        { id: "qg-11a1", move: "a6", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                          { id: "qg-12a1", move: "Qe2", name: "GDA Clásico completo", annotation: null, color: "white", opening: "queens_gambit", children: [] }
                                        ]}
                                      ]}
                                    ]}
                                  ]}
                                ]}
                              ],
                            },
                            {
                              id: "qg-6a2",
                              move: "Nc3",
                              name: "GDA Moderno",
                              annotation: "Presión inmediata sobre el centro",
                              color: "white",
                              opening: "queens_gambit",
                              children: [
                                { id: "qg-7a2", move: "e6", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                  { id: "qg-8a2", move: "e4", name: null, annotation: "Centro poderoso", color: "white", opening: "queens_gambit", children: [
                                    { id: "qg-9a2", move: "c5", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                      { id: "qg-10a2", move: "e5", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                        { id: "qg-11a2", move: "d5", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                          { id: "qg-12a2", move: "Nb5", name: "GDA Moderno agresivo", annotation: null, color: "white", opening: "queens_gambit", children: [] }
                                        ]}
                                      ]}
                                    ]}
                                  ]}
                                ]}
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "qg-3b",
                  move: "e6",
                  name: "Gambito de Dama Declinado",
                  annotation: "Declina manteniendo el centro con e6",
                  color: "black",
                  opening: "queens_gambit",
                  children: [
                    {
                      id: "qg-4b",
                      move: "Nc3",
                      name: null,
                      annotation: "Desarrolla y presiona el centro",
                      color: "white",
                      opening: "queens_gambit",
                      children: [
                        {
                          id: "qg-5b",
                          move: "Nf6",
                          name: null,
                          annotation: null,
                          color: "black",
                          opening: "queens_gambit",
                          children: [
                            {
                              id: "qg-6b",
                              move: "Bg5",
                              name: null,
                              annotation: "Clava el caballo negro",
                              color: "white",
                              opening: "queens_gambit",
                              children: [
                                {
                                  id: "qg-7b1",
                                  move: "Be7",
                                  name: "GDD Ortodoxa",
                                  annotation:
                                    "La continuación clásica y sólida",
                                  color: "black",
                                  opening: "queens_gambit",
                                  children: [
                                    { id: "qg-8b1", move: "Nf3", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                      { id: "qg-9b1", move: "O-O", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                        { id: "qg-10b1", move: "e3", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                          { id: "qg-11b1", move: "Nbd7", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                            { id: "qg-12b1", move: "Bd3", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                              { id: "qg-13b1", move: "dxc4", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                                { id: "qg-14b1", move: "Bxc4", name: "GDD Ortodoxa completa", annotation: null, color: "white", opening: "queens_gambit", children: [] }
                                              ]}
                                            ]}
                                          ]}
                                        ]}
                                      ]}
                                    ]}
                                  ],
                                },
                                {
                                  id: "qg-7b2",
                                  move: "Nbd7",
                                  name: "Cambridge Springs",
                                  annotation: "Prepara Bb4 y amenazas activas",
                                  color: "black",
                                  opening: "queens_gambit",
                                  children: [
                                    { id: "qg-8b2", move: "Nf3", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                      { id: "qg-9b2", move: "Qa5", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                        { id: "qg-10b2", move: "cxd5", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                          { id: "qg-11b2", move: "Nxd5", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                            { id: "qg-12b2", move: "Bd2", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                              { id: "qg-13b2", move: "Bb4", name: "Cambridge Springs completa", annotation: null, color: "black", opening: "queens_gambit", children: [] }
                                            ]}
                                          ]}
                                        ]}
                                      ]}
                                    ]}
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "qg-3c",
                  move: "c6",
                  name: "Defensa Eslava",
                  annotation: "Refuerza d5 sin bloquear el alfil de dama",
                  color: "black",
                  opening: "queens_gambit",
                  children: [
                    {
                      id: "qg-4c",
                      move: "Nf3",
                      name: null,
                      annotation: null,
                      color: "white",
                      opening: "queens_gambit",
                      children: [
                        {
                          id: "qg-5c",
                          move: "Nf6",
                          name: null,
                          annotation: null,
                          color: "black",
                          opening: "queens_gambit",
                          children: [
                            {
                              id: "qg-6c",
                              move: "Nc3",
                              name: null,
                              annotation: null,
                              color: "white",
                              opening: "queens_gambit",
                              children: [
                                {
                                  id: "qg-7c1",
                                  move: "dxc4",
                                  name: "Eslava Aceptada",
                                  annotation:
                                    "Acepta el gambito con c6 de apoyo",
                                  color: "black",
                                  opening: "queens_gambit",
                                  children: [
                                    { id: "qg-8c1", move: "e4", name: null, annotation: "Centro clásico", color: "white", opening: "queens_gambit", children: [
                                      { id: "qg-9c1", move: "b5", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                        { id: "qg-10c1", move: "a4", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                          { id: "qg-11c1", move: "b4", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                            { id: "qg-12c1", move: "Na2", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                              { id: "qg-13c1", move: "e6", name: "Eslava Aceptada completa", annotation: null, color: "black", opening: "queens_gambit", children: [] }
                                            ]}
                                          ]}
                                        ]}
                                      ]}
                                    ]}
                                  ],
                                },
                                {
                                  id: "qg-7c2",
                                  move: "e6",
                                  name: "Semi-Eslava",
                                  annotation:
                                    "Merano y Anti-Merano, muy agudas",
                                  color: "black",
                                  opening: "queens_gambit",
                                  children: [
                                    { id: "qg-8c2", move: "e4", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                      { id: "qg-9c2", move: "dxe4", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                        { id: "qg-10c2", move: "Nxe4", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                          { id: "qg-11c2", move: "Bb4+", name: null, annotation: null, color: "black", opening: "queens_gambit", children: [
                                            { id: "qg-12c2", move: "Bd2", name: null, annotation: null, color: "white", opening: "queens_gambit", children: [
                                              { id: "qg-13c2", move: "Qxd4", name: "Semi-Eslava meran", annotation: null, color: "black", opening: "queens_gambit", children: [] }
                                            ]}
                                          ]}
                                        ]}
                                      ]}
                                    ]}
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: "lon-2",
              move: "Nf3",
              name: "Sistema Londres",
              annotation: "Setup sólido sin comprometerse con c4",
              color: "white",
              opening: "london",
              children: [
                {
                  id: "lon-3",
                  move: "Nf6",
                  name: null,
                  annotation: "Desarrollo natural del caballo",
                  color: "black",
                  opening: "london",
                  children: [
                    {
                      id: "lon-4",
                      move: "Bf4",
                      name: null,
                      annotation: "Alfil activo antes de cerrar la cadena",
                      color: "white",
                      opening: "london",
                      children: [
                        {
                          id: "lon-5",
                          move: "e6",
                          name: null,
                          annotation: null,
                          color: "black",
                          opening: "london",
                          children: [
                            {
                              id: "lon-6",
                              move: "e3",
                              name: null,
                              annotation:
                                "Consolida el centro sin cambios bruscos",
                              color: "white",
                              opening: "london",
                              children: [
                                {
                                  id: "lon-7a",
                                  move: "Be7",
                                  name: "Londres Clásico",
                                  annotation:
                                    "Estructura sólida, juego posicional",
                                  color: "black",
                                  opening: "london",
                                  children: [
                                    { id: "lon-8a", move: "O-O", name: null, annotation: null, color: "white", opening: "london", children: [
                                      { id: "lon-9a", move: "O-O", name: null, annotation: null, color: "black", opening: "london", children: [
                                        { id: "lon-10a", move: "c3", name: null, annotation: null, color: "white", opening: "london", children: [
                                          { id: "lon-11a", move: "c5", name: null, annotation: null, color: "black", opening: "london", children: [
                                            { id: "lon-12a", move: "Nbd2", name: null, annotation: null, color: "white", opening: "london", children: [
                                              { id: "lon-13a", move: "Nc6", name: "Londres Clásico principal", annotation: null, color: "black", opening: "london", children: [] }
                                            ]}
                                          ]}
                                        ]}
                                      ]}
                                    ]}
                                  ],
                                },
                                {
                                  id: "lon-7b",
                                  move: "c5",
                                  name: "Londres vs c5",
                                  annotation:
                                    "Desafía el centro inmediatamente",
                                  color: "black",
                                  opening: "london",
                                  children: [
                                    { id: "lon-8b", move: "c3", name: null, annotation: null, color: "white", opening: "london", children: [
                                      { id: "lon-9b", move: "Nc6", name: null, annotation: null, color: "black", opening: "london", children: [
                                        { id: "lon-10b", move: "Nbd2", name: null, annotation: null, color: "white", opening: "london", children: [
                                          { id: "lon-11b", move: "Qb6", name: null, annotation: null, color: "black", opening: "london", children: [
                                            { id: "lon-12b", move: "Qb3", name: "Londres vs c5 tablas típicas", annotation: null, color: "white", opening: "london", children: [] }
                                          ]}
                                        ]}
                                      ]}
                                    ]}
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ── INDIAS (d4 Nf6) ───────────────────────────────────────────────
        {
          id: "ki-1",
          move: "Nf6",
          name: "Defensa India",
          annotation: "Control del centro desde el flanco",
          color: "black",
          opening: "kings_indian",
          children: [
            {
              id: "ki-2",
              move: "c4",
              name: null,
              annotation: "Expande el centro blanco",
              color: "white",
              opening: "kings_indian",
              children: [
                {
                  id: "ki-3a",
                  move: "g6",
                  name: "India de Rey",
                  annotation: "Fianchetto del alfil de rey",
                  color: "black",
                  opening: "kings_indian",
                  children: [
                    {
                      id: "ki-4a",
                      move: "Nc3",
                      name: null,
                      annotation: null,
                      color: "white",
                      opening: "kings_indian",
                      children: [
                        {
                          id: "ki-5a",
                          move: "Bg7",
                          name: null,
                          annotation:
                            "El poderoso alfil indio en la diagonal larga",
                          color: "black",
                          opening: "kings_indian",
                          children: [
                            {
                              id: "ki-6a",
                              move: "e4",
                              name: null,
                              annotation: "Gran centro de peones",
                              color: "white",
                              opening: "kings_indian",
                              children: [
                                {
                                  id: "ki-7a",
                                  move: "d6",
                                  name: null,
                                  annotation:
                                    "Prepara e5 para atacar el centro",
                                  color: "black",
                                  opening: "kings_indian",
                                  children: [
                                    {
                                      id: "ki-8a1",
                                      move: "Nf3",
                                      name: null,
                                      annotation: null,
                                      color: "white",
                                      opening: "kings_indian",
                                      children: [
                                        {
                                          id: "ki-9a1",
                                          move: "O-O",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "kings_indian",
                                          children: [
                                            {
                                              id: "ki-10a1",
                                              move: "Be2",
                                              name: "India de Rey Clásica",
                                              annotation:
                                                "La variante más popular del torneo",
                                              color: "white",
                                              opening: "kings_indian",
                                              children: [
                                                {
                                                  id: "ki-11a1",
                                                  move: "e5",
                                                  name: null,
                                                  annotation:
                                                    "La típica ruptura india, genera juego dinámico",
                                                  color: "black",
                                                  opening: "kings_indian",
                                                  children: [
                                                    { id: "ki-12a1", move: "d5", name: null, annotation: "Cierra el centro", color: "white", opening: "kings_indian", children: [
                                                      { id: "ki-13a1", move: "Nh5", name: null, annotation: "El caballo va a f4", color: "black", opening: "kings_indian", children: [
                                                        { id: "ki-14a1", move: "g3", name: null, annotation: null, color: "white", opening: "kings_indian", children: [
                                                          { id: "ki-15a1", move: "Nf4", name: null, annotation: null, color: "black", opening: "kings_indian", children: [
                                                            { id: "ki-16a1", move: "Ne1", name: null, annotation: null, color: "white", opening: "kings_indian", children: [
                                                              { id: "ki-17a1", move: "g5", name: "India de Rey Clásica principal", annotation: "Ataque en flanco de rey", color: "black", opening: "kings_indian", children: [] }
                                                            ]}
                                                          ]}
                                                        ]}
                                                      ]}
                                                    ]}
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      id: "ki-8a2",
                                      move: "f3",
                                      name: "Sämisch",
                                      annotation:
                                        "Agresivo, prepara el avance g4",
                                      color: "white",
                                      opening: "kings_indian",
                                      children: [
                                        {
                                          id: "ki-9a2",
                                          move: "O-O",
                                          name: null,
                                          annotation: null,
                                          color: "black",
                                          opening: "kings_indian",
                                          children: [
                                            {
                                              id: "ki-10a2",
                                              move: "Be3",
                                              name: "Sämisch Principal",
                                              annotation:
                                                "Apunta a las casillas negras del flanco de rey",
                                              color: "white",
                                              opening: "kings_indian",
                                              children: [
                                                { id: "ki-11a2", move: "Nbd7", name: null, annotation: null, color: "black", opening: "kings_indian", children: [
                                                  { id: "ki-12a2", move: "Qd2", name: null, annotation: null, color: "white", opening: "kings_indian", children: [
                                                    { id: "ki-13a2", move: "c5", name: null, annotation: null, color: "black", opening: "kings_indian", children: [
                                                      { id: "ki-14a2", move: "d5", name: null, annotation: null, color: "white", opening: "kings_indian", children: [
                                                        { id: "ki-15a2", move: "Ne5", name: null, annotation: null, color: "black", opening: "kings_indian", children: [
                                                          { id: "ki-16a2", move: "Nxe5", name: null, annotation: null, color: "white", opening: "kings_indian", children: [
                                                            { id: "ki-17a2", move: "fxe5", name: "Sämisch completo", annotation: null, color: "black", opening: "kings_indian", children: [] }
                                                          ]}
                                                        ]}
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "nim-3b",
                  move: "e6",
                  name: "Nimzo-India / India de Dama",
                  annotation: "Prepara Bb4 clavando el caballo de c3",
                  color: "black",
                  opening: "nimzo",
                  children: [
                    {
                      id: "nim-4b",
                      move: "Nc3",
                      name: null,
                      annotation: null,
                      color: "white",
                      opening: "nimzo",
                      children: [
                        {
                          id: "nim-5b",
                          move: "Bb4",
                          name: "Nimzo-India",
                          annotation:
                            "La clavada central, creación de Nimzowitsch",
                          color: "black",
                          opening: "nimzo",
                          children: [
                            {
                              id: "nim-6b1",
                              move: "Qc2",
                              name: "Nimzo Clásica",
                              annotation:
                                "Evita doblar peones, presión sobre c4",
                              color: "white",
                              opening: "nimzo",
                              children: [
                                {
                                  id: "nim-7b1",
                                  move: "O-O",
                                  name: null,
                                  annotation: "Desarrollo tranquilo y sólido",
                                  color: "black",
                                  opening: "nimzo",
                                  children: [
                                    { id: "nim-8b1", move: "a3", name: null, annotation: null, color: "white", opening: "nimzo", children: [
                                      { id: "nim-9b1", move: "Bxc3+", name: null, annotation: null, color: "black", opening: "nimzo", children: [
                                        { id: "nim-10b1", move: "Qxc3", name: null, annotation: null, color: "white", opening: "nimzo", children: [
                                          { id: "nim-11b1", move: "d5", name: null, annotation: null, color: "black", opening: "nimzo", children: [
                                            { id: "nim-12b1", move: "cxd5", name: null, annotation: null, color: "white", opening: "nimzo", children: [
                                              { id: "nim-13b1", move: "Nxd5", name: "Nimzo Clásica completa", annotation: null, color: "black", opening: "nimzo", children: [] }
                                            ]}
                                          ]}
                                        ]}
                                      ]}
                                    ]}
                                  ],
                                },
                              ],
                            },
                            {
                              id: "nim-6b2",
                              move: "e3",
                              name: "Nimzo Rubinstein",
                              annotation:
                                "Sólida y clásica, consolida el centro",
                              color: "white",
                              opening: "nimzo",
                              children: [
                                {
                                  id: "nim-7b2",
                                  move: "O-O",
                                  name: null,
                                  annotation: null,
                                  color: "black",
                                  opening: "nimzo",
                                  children: [
                                    {
                                      id: "nim-8b2",
                                      move: "Bd3",
                                      name: null,
                                      annotation: "Alfil apunta a h7",
                                      color: "white",
                                      opening: "nimzo",
                                      children: [
                                        { id: "nim-9b2", move: "c5", name: null, annotation: null, color: "black", opening: "nimzo", children: [
                                          { id: "nim-10b2", move: "Nf3", name: null, annotation: null, color: "white", opening: "nimzo", children: [
                                            { id: "nim-11b2", move: "d5", name: null, annotation: null, color: "black", opening: "nimzo", children: [
                                              { id: "nim-12b2", move: "O-O", name: null, annotation: null, color: "white", opening: "nimzo", children: [
                                                { id: "nim-13b2", move: "a6", name: null, annotation: null, color: "black", opening: "nimzo", children: [
                                                  { id: "nim-14b2", move: "cxd5", name: "Nimzo Rubinstein completa", annotation: null, color: "white", opening: "nimzo", children: [] }
                                                ]}
                                              ]}
                                            ]}
                                          ]}
                                        ]}
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
