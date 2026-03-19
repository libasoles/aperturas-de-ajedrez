// Árbol de aperturas de ajedrez
export const OPENING_TREE = {
  id: "root",
  move: "Inicial",
  color: "white",
  opening: "root",
  children: [
    {
      id: "e4",
      move: "e4",
      color: "white",
      opening: "root",
      children: [
        // ── ESCANDINAVA ──────────────────────────────────────────────────
        {
          id: "scan-1",
          move: "d5",
          color: "black",
          opening: "scandinavian",
          children: [
            {
              id: "scan-2",
              move: "exd5",
              color: "white",
              opening: "scandinavian",
              children: [
                {
                  id: "scan-3a",
                  move: "Qxd5",
                  color: "black",
                  opening: "scandinavian",
                  children: [
                    {
                      id: "scan-4a",
                      move: "Nc3",
                      color: "white",
                      opening: "scandinavian",
                      children: [
                        {
                          id: "scan-5a1",
                          move: "Qd6",
                          color: "black",
                          opening: "scandinavian",
                          children: [
                            {
                              id: "scan-6a1",
                              move: "d4",
                              color: "white",
                              opening: "scandinavian",
                              children: [
                                {
                                  id: "scan-7a1",
                                  move: "Nf6",
                                  color: "black",
                                  opening: "scandinavian",
                                  children: [
                                    {
                                      id: "scan-8a1",
                                      move: "Nf3",
                                      color: "white",
                                      opening: "scandinavian",
                                      children: [
                                        {
                                          id: "scan-9a1a",
                                          move: "g6",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10a1a", move: "h3", color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11a1a", move: "Bg7", color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12a1a", move: "Be2", color: "white", opening: "scandinavian", children: [
                                                  { id: "scan-13a1a", move: "O-O", color: "black", opening: "scandinavian", children: [] }
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "scan-9a1b",
                                          move: "Bg4",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10a1b", move: "Be2", color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11a1b", move: "Bxf3", color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12a1b", move: "Bxf3", color: "white", opening: "scandinavian", children: [
                                                  { id: "scan-13a1b", move: "e6", color: "black", opening: "scandinavian", children: [] }
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
                          color: "black",
                          opening: "scandinavian",
                          children: [
                            {
                              id: "scan-6a2",
                              move: "d4",
                              color: "white",
                              opening: "scandinavian",
                              children: [
                                {
                                  id: "scan-7a2",
                                  move: "Nf6",
                                  color: "black",
                                  opening: "scandinavian",
                                  children: [
                                    {
                                      id: "scan-8a2",
                                      move: "Nf3",
                                      color: "white",
                                      opening: "scandinavian",
                                      children: [
                                        {
                                          id: "scan-9a2a",
                                          move: "Bg4",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10a2a", move: "h3", color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11a2a", move: "Bxf3", color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12a2a", move: "Qxf3", color: "white", opening: "scandinavian", children: [
                                                  { id: "scan-13a2a", move: "e6", color: "black", opening: "scandinavian", children: [] }
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "scan-9a2b",
                                          move: "e6",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10a2b", move: "Bc4", color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11a2b", move: "Bb4", color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12a2b", move: "Bd2", color: "white", opening: "scandinavian", children: [
                                                  { id: "scan-13a2b", move: "O-O", color: "black", opening: "scandinavian", children: [] }
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
                  color: "black",
                  opening: "scandinavian",
                  children: [
                    {
                      id: "scan-4b",
                      move: "d4",
                      color: "white",
                      opening: "scandinavian",
                      children: [
                        {
                          id: "scan-5b1",
                          move: "Nxd5",
                          color: "black",
                          opening: "scandinavian",
                          children: [
                            {
                              id: "scan-6b1",
                              move: "Nc3",
                              color: "white",
                              opening: "scandinavian",
                              children: [
                                {
                                  id: "scan-7b1a",
                                  move: "g6",
                                  color: "black",
                                  opening: "scandinavian",
                                  children: [
                                    {
                                      id: "scan-8b1a",
                                      move: "Bc4",
                                      color: "white",
                                      opening: "scandinavian",
                                      children: [
                                        {
                                          id: "scan-9b1a",
                                          move: "Nb6",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10b1a", move: "Nf3", color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11b1a", move: "Bg7", color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12b1a", move: "Be3", color: "white", opening: "scandinavian", children: [] }
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
                                  color: "black",
                                  opening: "scandinavian",
                                  children: [
                                    {
                                      id: "scan-8b1b",
                                      move: "bxc3",
                                      color: "white",
                                      opening: "scandinavian",
                                      children: [
                                        {
                                          id: "scan-9b1b",
                                          move: "g6",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10b1b", move: "Bd3", color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11b1b", move: "Bg7", color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12b1b", move: "Nf3", color: "white", opening: "scandinavian", children: [
                                                  { id: "scan-13b1b", move: "c5", color: "black", opening: "scandinavian", children: [] }
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
                          color: "black",
                          opening: "scandinavian",
                          children: [
                            {
                              id: "scan-6b2",
                              move: "dxe6",
                              color: "white",
                              opening: "scandinavian",
                              children: [
                                {
                                  id: "scan-7b2",
                                  move: "Bxe6",
                                  color: "black",
                                  opening: "scandinavian",
                                  children: [
                                    {
                                      id: "scan-8b2",
                                      move: "Nf3",
                                      color: "white",
                                      opening: "scandinavian",
                                      children: [
                                        {
                                          id: "scan-9b2",
                                          move: "Nc6",
                                          color: "black",
                                          opening: "scandinavian",
                                          children: [
                                            { id: "scan-10b2", move: "Bb5", color: "white", opening: "scandinavian", children: [
                                              { id: "scan-11b2", move: "Bd7", color: "black", opening: "scandinavian", children: [
                                                { id: "scan-12b2", move: "Bxc6", color: "white", opening: "scandinavian", children: [
                                                  { id: "scan-13b2", move: "Bxc6", color: "black", opening: "scandinavian", children: [] }
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
          color: "black",
          opening: "spanish",
          children: [
            {
              id: "span-2",
              move: "Nf3",
              color: "white",
              opening: "spanish",
              children: [
                {
                  id: "span-3",
                  move: "Nc6",
                  color: "black",
                  opening: "spanish",
                  children: [
                    // Ruy López
                    {
                      id: "span-4",
                      move: "Bb5",
                      color: "white",
                      opening: "spanish",
                      children: [
                        {
                          id: "span-5a",
                          move: "a6",
                          color: "black",
                          opening: "spanish",
                          children: [
                            {
                              id: "span-6a",
                              move: "Ba4",
                              color: "white",
                              opening: "spanish",
                              children: [
                                {
                                  id: "span-7a1",
                                  move: "Nf6",
                                  color: "black",
                                  opening: "spanish",
                                  children: [
                                    {
                                      id: "span-8a1",
                                      move: "O-O",
                                      color: "white",
                                      opening: "spanish",
                                      children: [
                                        {
                                          id: "span-9a1a",
                                          move: "Be7",
                                          color: "black",
                                          opening: "spanish",
                                          children: [
                                            { id: "span-10a1a", move: "d4", color: "white", opening: "spanish", children: [
                                              { id: "span-11a1a", move: "d6", color: "black", opening: "spanish", children: [
                                                { id: "span-12a1a", move: "c3", color: "white", opening: "spanish", children: [
                                                  { id: "span-13a1a", move: "O-O", color: "black", opening: "spanish", children: [
                                                    { id: "span-14a1a", move: "Nbd2", color: "white", opening: "spanish", children: [
                                                      { id: "span-15a1a", move: "Nb8", color: "black", opening: "spanish", children: [
                                                        { id: "span-16a1a", move: "Re1", color: "white", opening: "spanish", children: [] }
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
                                          color: "black",
                                          opening: "spanish",
                                          children: [
                                            { id: "span-10a1b", move: "Bb3", color: "white", opening: "spanish", children: [
                                              { id: "span-11a1b", move: "Be7", color: "black", opening: "spanish", children: [
                                                { id: "span-12a1b", move: "d4", color: "white", opening: "spanish", children: [
                                                  { id: "span-13a1b", move: "exd4", color: "black", opening: "spanish", children: [
                                                    { id: "span-14a1b", move: "Nxd4", color: "white", opening: "spanish", children: [
                                                      { id: "span-15a1b", move: "Nxe4", color: "black", opening: "spanish", children: [
                                                        { id: "span-16a1b", move: "Re1", color: "white", opening: "spanish", children: [] }
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
                              color: "white",
                              opening: "spanish",
                              children: [
                                {
                                  id: "span-7ae",
                                  move: "dxc6",
                                  color: "black",
                                  opening: "spanish",
                                  children: [
                                    {
                                      id: "span-8ae",
                                      move: "Nc3",
                                      color: "white",
                                      opening: "spanish",
                                      children: [
                                        {
                                          id: "span-9ae",
                                          move: "f6",
                                          color: "black",
                                          opening: "spanish",
                                          children: [
                                            { id: "span-10ae", move: "d4", color: "white", opening: "spanish", children: [
                                              { id: "span-11ae", move: "exd4", color: "black", opening: "spanish", children: [
                                                { id: "span-12ae", move: "Qxd4", color: "white", opening: "spanish", children: [
                                                  { id: "span-13ae", move: "Qxd4", color: "black", opening: "spanish", children: [
                                                    { id: "span-14ae", move: "Nxd4", color: "white", opening: "spanish", children: [] }
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
                          color: "black",
                          opening: "spanish",
                          children: [
                            {
                              id: "span-6b",
                              move: "O-O",
                              color: "white",
                              opening: "spanish",
                              children: [
                                {
                                  id: "span-7b",
                                  move: "Nxe4",
                                  color: "black",
                                  opening: "spanish",
                                  children: [
                                    {
                                      id: "span-8b",
                                      move: "d4",
                                      color: "white",
                                      opening: "spanish",
                                      children: [
                                        {
                                          id: "span-9b1",
                                          move: "Nd6",
                                          color: "black",
                                          opening: "spanish",
                                          children: [
                                            { id: "span-10b1", move: "Nxe5", color: "white", opening: "spanish", children: [
                                              { id: "span-11b1", move: "Nxe5", color: "black", opening: "spanish", children: [
                                                { id: "span-12b1", move: "Re1", color: "white", opening: "spanish", children: [
                                                  { id: "span-13b1", move: "Be7", color: "black", opening: "spanish", children: [
                                                    { id: "span-14b1", move: "Rxe5", color: "white", opening: "spanish", children: [
                                                      { id: "span-15b1", move: "O-O", color: "black", opening: "spanish", children: [
                                                        { id: "span-16b1", move: "Bd3", color: "white", opening: "spanish", children: [] }
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
                                          move: "Be7",
                                          color: "black",
                                          opening: "spanish",
                                          children: [
                                            { id: "span-10b2", move: "Qe2", color: "white", opening: "spanish", children: [
                                              { id: "span-11b2", move: "Nd6", color: "black", opening: "spanish", children: [
                                                { id: "span-12b2", move: "Bxc6", color: "white", opening: "spanish", children: [
                                                  { id: "span-13b2", move: "bxc6", color: "black", opening: "spanish", children: [
                                                    { id: "span-14b2", move: "dxe5", color: "white", opening: "spanish", children: [
                                                      { id: "span-15b2", move: "Nb7", color: "black", opening: "spanish", children: [] }
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
                          color: "black",
                          opening: "spanish",
                          children: [
                            {
                              id: "span-6c",
                              move: "Nc3",
                              color: "white",
                              opening: "spanish",
                              children: [
                                {
                                  id: "span-7c",
                                  move: "fxe4",
                                  color: "black",
                                  opening: "spanish",
                                  children: [
                                    {
                                      id: "span-8c",
                                      move: "Nxe4",
                                      color: "white",
                                      opening: "spanish",
                                      children: [
                                        {
                                          id: "span-9c",
                                          move: "d5",
                                          color: "black",
                                          opening: "spanish",
                                          children: [
                                            { id: "span-10c", move: "Nfg5", color: "white", opening: "spanish", children: [
                                              { id: "span-11c", move: "d4", color: "black", opening: "spanish", children: [
                                                { id: "span-12c", move: "Nd6+", color: "white", opening: "spanish", children: [
                                                  { id: "span-13c", move: "Qxd6", color: "black", opening: "spanish", children: [
                                                    { id: "span-14c", move: "Nf3", color: "white", opening: "spanish", children: [] }
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
                      color: "white",
                      opening: "italian",
                      children: [
                        {
                          id: "ital-2a",
                          move: "Bc5",
                          color: "black",
                          opening: "italian",
                          children: [
                            {
                              id: "ital-3a",
                              move: "c3",
                              color: "white",
                              opening: "italian",
                              children: [
                                {
                                  id: "ital-4a",
                                  move: "Nf6",
                                  color: "black",
                                  opening: "italian",
                                  children: [
                                    {
                                      id: "ital-5a",
                                      move: "d4",
                                      color: "white",
                                      opening: "italian",
                                      children: [
                                        {
                                          id: "ital-6a1",
                                          move: "exd4",
                                          color: "black",
                                          opening: "italian",
                                          children: [
                                            { id: "ital-7a1", move: "cxd4", color: "white", opening: "italian", children: [
                                              { id: "ital-8a1", move: "Bb4+", color: "black", opening: "italian", children: [
                                                { id: "ital-9a1", move: "Nc3", color: "white", opening: "italian", children: [
                                                  { id: "ital-10a1", move: "Nxe4", color: "black", opening: "italian", children: [
                                                    { id: "ital-11a1", move: "O-O", color: "white", opening: "italian", children: [
                                                      { id: "ital-12a1", move: "Bxc3", color: "black", opening: "italian", children: [
                                                        { id: "ital-13a1", move: "d5", color: "white", opening: "italian", children: [] }
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
                                          color: "black",
                                          opening: "italian",
                                          children: [
                                            { id: "ital-7a2", move: "d5", color: "white", opening: "italian", children: [
                                              { id: "ital-8a2", move: "Ne7", color: "black", opening: "italian", children: [
                                                { id: "ital-9a2", move: "d6", color: "white", opening: "italian", children: [
                                                  { id: "ital-10a2", move: "Ng6", color: "black", opening: "italian", children: [
                                                    { id: "ital-11a2", move: "Ng5", color: "white", opening: "italian", children: [
                                                      { id: "ital-12a2", move: "O-O", color: "black", opening: "italian", children: [] }
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
                          color: "black",
                          opening: "italian",
                          children: [
                            {
                              id: "ital-3b",
                              move: "Ng5",
                              color: "white",
                              opening: "italian",
                              children: [
                                {
                                  id: "ital-4b",
                                  move: "d5",
                                  color: "black",
                                  opening: "italian",
                                  children: [
                                    {
                                      id: "ital-5b",
                                      move: "exd5",
                                      color: "white",
                                      opening: "italian",
                                      children: [
                                        {
                                          id: "ital-6b1",
                                          move: "Na5",
                                          color: "black",
                                          opening: "italian",
                                          children: [
                                            { id: "ital-7b1", move: "Bb5+", color: "white", opening: "italian", children: [
                                              { id: "ital-8b1", move: "c6", color: "black", opening: "italian", children: [
                                                { id: "ital-9b1", move: "dxc6", color: "white", opening: "italian", children: [
                                                  { id: "ital-10b1", move: "bxc6", color: "black", opening: "italian", children: [
                                                    { id: "ital-11b1", move: "Bd3", color: "white", opening: "italian", children: [
                                                      { id: "ital-12b1", move: "Nd5", color: "black", opening: "italian", children: [] }
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
                                          color: "black",
                                          opening: "italian",
                                          children: [
                                            { id: "ital-7b2", move: "Nxf7", color: "white", opening: "italian", children: [
                                              { id: "ital-8b2", move: "Kxf7", color: "black", opening: "italian", children: [
                                                { id: "ital-9b2", move: "Qf3+", color: "white", opening: "italian", children: [
                                                  { id: "ital-10b2", move: "Ke6", color: "black", opening: "italian", children: [
                                                    { id: "ital-11b2", move: "Nc3", color: "white", opening: "italian", children: [
                                                      { id: "ital-12b2", move: "Ncb4", color: "black", opening: "italian", children: [] }
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
                              color: "white",
                              opening: "italian",
                              children: [
                                {
                                  id: "ital-4b2",
                                  move: "Nxe4",
                                  color: "black",
                                  opening: "italian",
                                  children: [
                                    {
                                      id: "ital-5b2",
                                      move: "Re1",
                                      color: "white",
                                      opening: "italian",
                                      children: [
                                        {
                                          id: "ital-6b3",
                                          move: "d5",
                                          color: "black",
                                          opening: "italian",
                                          children: [
                                            { id: "ital-7b3", move: "Bxd5", color: "white", opening: "italian", children: [
                                              { id: "ital-8b3", move: "Qxd5", color: "black", opening: "italian", children: [
                                                { id: "ital-9b3", move: "Nc3", color: "white", opening: "italian", children: [
                                                  { id: "ital-10b3", move: "Qa5", color: "black", opening: "italian", children: [
                                                    { id: "ital-11b3", move: "Nxe4", color: "white", opening: "italian", children: [
                                                      { id: "ital-12b3", move: "Be6", color: "black", opening: "italian", children: [] }
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
          color: "black",
          opening: "sicilian",
          children: [
            {
              id: "sic-2",
              move: "Nf3",
              color: "white",
              opening: "sicilian",
              children: [
                {
                  id: "sic-3a",
                  move: "d6",
                  color: "black",
                  opening: "sicilian",
                  children: [
                    {
                      id: "sic-4a",
                      move: "d4",
                      color: "white",
                      opening: "sicilian",
                      children: [
                        {
                          id: "sic-5a",
                          move: "cxd4",
                          color: "black",
                          opening: "sicilian",
                          children: [
                            {
                              id: "sic-6a",
                              move: "Nxd4",
                              color: "white",
                              opening: "sicilian",
                              children: [
                                {
                                  id: "sic-7a1",
                                  move: "Nf6",
                                  color: "black",
                                  opening: "sicilian",
                                  children: [
                                    {
                                      id: "sic-8a",
                                      move: "Nc3",
                                      color: "white",
                                      opening: "sicilian",
                                      children: [
                                        {
                                          id: "sic-9a1",
                                          move: "a6",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            {
                                              id: "sic-10a1",
                                              move: "Bg5",
                                              color: "white",
                                              opening: "sicilian",
                                              children: [
                                                { id: "sic-11a1", move: "Nbd7", color: "black", opening: "sicilian", children: [
                                                  { id: "sic-12a1", move: "Qf3", color: "white", opening: "sicilian", children: [
                                                    { id: "sic-13a1", move: "Qc7", color: "black", opening: "sicilian", children: [
                                                      { id: "sic-14a1", move: "O-O-O", color: "white", opening: "sicilian", children: [
                                                        { id: "sic-15a1", move: "e6", color: "black", opening: "sicilian", children: [] }
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ],
                                            },
                                            {
                                              id: "sic-10a2",
                                              move: "Be3",
                                              color: "white",
                                              opening: "sicilian",
                                              children: [
                                                { id: "sic-11a2", move: "Nbd7", color: "black", opening: "sicilian", children: [
                                                  { id: "sic-12a2", move: "f3", color: "white", opening: "sicilian", children: [
                                                    { id: "sic-13a2", move: "e5", color: "black", opening: "sicilian", children: [
                                                      { id: "sic-14a2", move: "Nb3", color: "white", opening: "sicilian", children: [
                                                        { id: "sic-15a2", move: "b5", color: "black", opening: "sicilian", children: [
                                                          { id: "sic-16a2", move: "g4", color: "white", opening: "sicilian", children: [] }
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
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            {
                                              id: "sic-10a3",
                                              move: "Be3",
                                              color: "white",
                                              opening: "sicilian",
                                              children: [
                                                { id: "sic-11a3", move: "Bg7", color: "black", opening: "sicilian", children: [
                                                  { id: "sic-12a3", move: "Qd2", color: "white", opening: "sicilian", children: [
                                                    { id: "sic-13a3", move: "Nc6", color: "black", opening: "sicilian", children: [
                                                      { id: "sic-14a3", move: "O-O-O", color: "white", opening: "sicilian", children: [
                                                        { id: "sic-15a3", move: "Ne5", color: "black", opening: "sicilian", children: [
                                                          { id: "sic-16a3", move: "h4", color: "white", opening: "sicilian", children: [] }
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
                                              color: "white",
                                              opening: "sicilian",
                                              children: [
                                                { id: "sic-11a4", move: "Nc6", color: "black", opening: "sicilian", children: [
                                                  { id: "sic-12a4", move: "Bc4", color: "white", opening: "sicilian", children: [
                                                    { id: "sic-13a4", move: "Bd7", color: "black", opening: "sicilian", children: [
                                                      { id: "sic-14a4", move: "Bb3", color: "white", opening: "sicilian", children: [
                                                        { id: "sic-15a4", move: "Rb8", color: "black", opening: "sicilian", children: [] }
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
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            {
                                              id: "sic-10a5",
                                              move: "g4",
                                              color: "white",
                                              opening: "sicilian",
                                              children: [
                                                { id: "sic-11a5", move: "h6", color: "black", opening: "sicilian", children: [
                                                  { id: "sic-12a5", move: "h4", color: "white", opening: "sicilian", children: [
                                                    { id: "sic-13a5", move: "Nc6", color: "black", opening: "sicilian", children: [
                                                      { id: "sic-14a5", move: "Rg1", color: "white", opening: "sicilian", children: [
                                                        { id: "sic-15a5", move: "d5", color: "black", opening: "sicilian", children: [] }
                                                      ]}
                                                    ]}
                                                  ]}
                                                ]}
                                              ],
                                            },
                                            {
                                              id: "sic-10a6",
                                              move: "Be2",
                                              color: "white",
                                              opening: "sicilian",
                                              children: [
                                                { id: "sic-11a6", move: "Be7", color: "black", opening: "sicilian", children: [
                                                  { id: "sic-12a6", move: "O-O", color: "white", opening: "sicilian", children: [
                                                    { id: "sic-13a6", move: "O-O", color: "black", opening: "sicilian", children: [
                                                      { id: "sic-14a6", move: "f4", color: "white", opening: "sicilian", children: [
                                                        { id: "sic-15a6", move: "Qc7", color: "black", opening: "sicilian", children: [] }
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
                  color: "black",
                  opening: "sicilian",
                  children: [
                    {
                      id: "sic-4b",
                      move: "d4",
                      color: "white",
                      opening: "sicilian",
                      children: [
                        {
                          id: "sic-5b",
                          move: "cxd4",
                          color: "black",
                          opening: "sicilian",
                          children: [
                            {
                              id: "sic-6b",
                              move: "Nxd4",
                              color: "white",
                              opening: "sicilian",
                              children: [
                                {
                                  id: "sic-7b1",
                                  move: "Nf6",
                                  color: "black",
                                  opening: "sicilian",
                                  children: [
                                    {
                                      id: "sic-8b1",
                                      move: "Nc3",
                                      color: "white",
                                      opening: "sicilian",
                                      children: [
                                        {
                                          id: "sic-9b1a",
                                          move: "d6",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10b1a", move: "Be2", color: "white", opening: "sicilian", children: [
                                              { id: "sic-11b1a", move: "e5", color: "black", opening: "sicilian", children: [
                                                { id: "sic-12b1a", move: "Nb3", color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13b1a", move: "Be6", color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14b1a", move: "Be3", color: "white", opening: "sicilian", children: [] }
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "sic-9b1b",
                                          move: "e5",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10b1b", move: "Ndb5", color: "white", opening: "sicilian", children: [
                                              { id: "sic-11b1b", move: "d6", color: "black", opening: "sicilian", children: [
                                                { id: "sic-12b1b", move: "Nd5", color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13b1b", move: "Nxd5", color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14b1b", move: "exd5", color: "white", opening: "sicilian", children: [
                                                      { id: "sic-15b1b", move: "Ne7", color: "black", opening: "sicilian", children: [] }
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
                                  color: "black",
                                  opening: "sicilian",
                                  children: [
                                    {
                                      id: "sic-8b2",
                                      move: "Nc3",
                                      color: "white",
                                      opening: "sicilian",
                                      children: [
                                        {
                                          id: "sic-9b2a",
                                          move: "Nf6",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10b2a", move: "Ndb5", color: "white", opening: "sicilian", children: [
                                              { id: "sic-11b2a", move: "d6", color: "black", opening: "sicilian", children: [
                                                { id: "sic-12b2a", move: "Bf4", color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13b2a", move: "e5", color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14b2a", move: "Bg5", color: "white", opening: "sicilian", children: [] }
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "sic-9b2b",
                                          move: "a6",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10b2b", move: "Ndb5", color: "white", opening: "sicilian", children: [
                                              { id: "sic-11b2b", move: "axb5", color: "black", opening: "sicilian", children: [
                                                { id: "sic-12b2b", move: "Nxb5", color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13b2b", move: "Bb4", color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14b2b", move: "Bd2", color: "white", opening: "sicilian", children: [] }
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
                  color: "black",
                  opening: "sicilian",
                  children: [
                    {
                      id: "sic-4c",
                      move: "d4",
                      color: "white",
                      opening: "sicilian",
                      children: [
                        {
                          id: "sic-5c",
                          move: "cxd4",
                          color: "black",
                          opening: "sicilian",
                          children: [
                            {
                              id: "sic-6c",
                              move: "Nxd4",
                              color: "white",
                              opening: "sicilian",
                              children: [
                                {
                                  id: "sic-7c1",
                                  move: "a6",
                                  color: "black",
                                  opening: "sicilian",
                                  children: [
                                    {
                                      id: "sic-8c1",
                                      move: "Nc3",
                                      color: "white",
                                      opening: "sicilian",
                                      children: [
                                        {
                                          id: "sic-9c1a",
                                          move: "Qc7",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10c1a", move: "Be2", color: "white", opening: "sicilian", children: [
                                              { id: "sic-11c1a", move: "Nf6", color: "black", opening: "sicilian", children: [
                                                { id: "sic-12c1a", move: "O-O", color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13c1a", move: "Be7", color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14c1a", move: "Be3", color: "white", opening: "sicilian", children: [] }
                                                  ]}
                                                ]}
                                              ]}
                                            ]}
                                          ],
                                        },
                                        {
                                          id: "sic-9c1b",
                                          move: "b5",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10c1b", move: "Bd3", color: "white", opening: "sicilian", children: [
                                              { id: "sic-11c1b", move: "Bb7", color: "black", opening: "sicilian", children: [
                                                { id: "sic-12c1b", move: "O-O", color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13c1b", move: "Nf6", color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14c1b", move: "Kh1", color: "white", opening: "sicilian", children: [] }
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
                                  color: "black",
                                  opening: "sicilian",
                                  children: [
                                    {
                                      id: "sic-8c2",
                                      move: "Nc3",
                                      color: "white",
                                      opening: "sicilian",
                                      children: [
                                        {
                                          id: "sic-9c2a",
                                          move: "d6",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10c2a", move: "Be2", color: "white", opening: "sicilian", children: [
                                              { id: "sic-11c2a", move: "a6", color: "black", opening: "sicilian", children: [
                                                { id: "sic-12c2a", move: "O-O", color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13c2a", move: "Be7", color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14c2a", move: "f4", color: "white", opening: "sicilian", children: [
                                                      { id: "sic-15c2a", move: "O-O", color: "black", opening: "sicilian", children: [] }
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
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10c2b", move: "Bd3", color: "white", opening: "sicilian", children: [
                                              { id: "sic-11c2b", move: "Bxc3+", color: "black", opening: "sicilian", children: [
                                                { id: "sic-12c2b", move: "bxc3", color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13c2b", move: "O-O", color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14c2b", move: "O-O", color: "white", opening: "sicilian", children: [
                                                      { id: "sic-15c2b", move: "d6", color: "black", opening: "sicilian", children: [] }
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
              color: "white",
              opening: "sicilian",
              children: [
                {
                  id: "sic-3d",
                  move: "Nc6",
                  color: "black",
                  opening: "sicilian",
                  children: [
                    {
                      id: "sic-4d",
                      move: "g3",
                      color: "white",
                      opening: "sicilian",
                      children: [
                        {
                          id: "sic-5d",
                          move: "g6",
                          color: "black",
                          opening: "sicilian",
                          children: [
                            {
                              id: "sic-6d",
                              move: "Bg2",
                              color: "white",
                              opening: "sicilian",
                              children: [
                                {
                                  id: "sic-7d",
                                  move: "Bg7",
                                  color: "black",
                                  opening: "sicilian",
                                  children: [
                                    {
                                      id: "sic-8d",
                                      move: "d3",
                                      color: "white",
                                      opening: "sicilian",
                                      children: [
                                        {
                                          id: "sic-9d",
                                          move: "d6",
                                          color: "black",
                                          opening: "sicilian",
                                          children: [
                                            { id: "sic-10d", move: "Be3", color: "white", opening: "sicilian", children: [
                                              { id: "sic-11d", move: "e6", color: "black", opening: "sicilian", children: [
                                                { id: "sic-12d", move: "Nge2", color: "white", opening: "sicilian", children: [
                                                  { id: "sic-13d", move: "Nge7", color: "black", opening: "sicilian", children: [
                                                    { id: "sic-14d", move: "O-O", color: "white", opening: "sicilian", children: [
                                                      { id: "sic-15d", move: "O-O", color: "black", opening: "sicilian", children: [
                                                        { id: "sic-16da", move: "Rb1", color: "white", opening: "sicilian", children: [] },
                                                        { id: "sic-16db", move: "Nd5", color: "white", opening: "sicilian", children: [] }
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
          color: "black",
          opening: "french",
          children: [
            {
              id: "fr-2",
              move: "d4",
              color: "white",
              opening: "french",
              children: [
                {
                  id: "fr-3",
                  move: "d5",
                  color: "black",
                  opening: "french",
                  children: [
                    {
                      id: "fr-4a",
                      move: "e5",
                      color: "white",
                      opening: "french",
                      children: [
                        {
                          id: "fr-5a",
                          move: "c5",
                          color: "black",
                          opening: "french",
                          children: [
                            {
                              id: "fr-6a",
                              move: "c3",
                              color: "white",
                              opening: "french",
                              children: [
                                {
                                  id: "fr-7a",
                                  move: "Nc6",
                                  color: "black",
                                  opening: "french",
                                  children: [
                                    {
                                      id: "fr-8a",
                                      move: "Nf3",
                                      color: "white",
                                      opening: "french",
                                      children: [
                                        {
                                          id: "fr-9a",
                                          move: "Qb6",
                                          color: "black",
                                          opening: "french",
                                          children: [
                                            {
                                              id: "fr-10a",
                                              move: "Nbd2",
                                              color: "white",
                                              opening: "french",
                                              children: [
                                                {
                                                  id: "fr-11a",
                                                  move: "cxd4",
                                                  color: "black",
                                                  opening: "french",
                                                  children: [
                                                    {
                                                      id: "fr-12a",
                                                      move: "cxd4",
                                                      color: "white",
                                                      opening: "french",
                                                      children: [
                                                        {
                                                          id: "fr-13a",
                                                          move: "Bb4",
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
                      color: "white",
                      opening: "french",
                      children: [
                        {
                          id: "fr-5b",
                          move: "exd5",
                          color: "black",
                          opening: "french",
                          children: [
                            {
                              id: "fr-6b",
                              move: "Nf3",
                              color: "white",
                              opening: "french",
                              children: [
                                {
                                  id: "fr-7b",
                                  move: "Nf6",
                                  color: "black",
                                  opening: "french",
                                  children: [
                                    {
                                      id: "fr-8b",
                                      move: "Bd3",
                                      color: "white",
                                      opening: "french",
                                      children: [
                                        {
                                          id: "fr-9b",
                                          move: "Bd6",
                                          color: "black",
                                          opening: "french",
                                          children: [
                                            {
                                              id: "fr-10b",
                                              move: "Qe2+",
                                              color: "white",
                                              opening: "french",
                                              children: [
                                                {
                                                  id: "fr-11b",
                                                  move: "Qe7",
                                                  color: "black",
                                                  opening: "french",
                                                  children: [
                                                    {
                                                      id: "fr-12b",
                                                      move: "Qxe7+",
                                                      color: "white",
                                                      opening: "french",
                                                      children: [
                                                        {
                                                          id: "fr-13b",
                                                          move: "Kxe7",
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
                      color: "white",
                      opening: "french",
                      children: [
                        {
                          id: "fr-5c1",
                          move: "Bb4",
                          color: "black",
                          opening: "french",
                          children: [
                            {
                              id: "fr-6c1",
                              move: "e5",
                              color: "white",
                              opening: "french",
                              children: [
                                {
                                  id: "fr-7c1",
                                  move: "c5",
                                  color: "black",
                                  opening: "french",
                                  children: [
                                    {
                                      id: "fr-8c1",
                                      move: "a3",
                                      color: "white",
                                      opening: "french",
                                      children: [
                                        {
                                          id: "fr-9c1",
                                          move: "Bxc3+",
                                          color: "black",
                                          opening: "french",
                                          children: [
                                            {
                                              id: "fr-10c1",
                                              move: "bxc3",
                                              color: "white",
                                              opening: "french",
                                              children: [
                                                {
                                                  id: "fr-11c1",
                                                  move: "Ne7",
                                                  color: "black",
                                                  opening: "french",
                                                  children: [
                                                    {
                                                      id: "fr-12c1",
                                                      move: "Qg4",
                                                      color: "white",
                                                      opening: "french",
                                                      children: [
                                                        {
                                                          id: "fr-13c1",
                                                          move: "Nf5",
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
                          color: "black",
                          opening: "french",
                          children: [
                            {
                              id: "fr-6c2",
                              move: "e5",
                              color: "white",
                              opening: "french",
                              children: [
                                {
                                  id: "fr-7c2",
                                  move: "Nfd7",
                                  color: "black",
                                  opening: "french",
                                  children: [
                                    {
                                      id: "fr-8c2",
                                      move: "f4",
                                      color: "white",
                                      opening: "french",
                                      children: [
                                        {
                                          id: "fr-9c2",
                                          move: "c5",
                                          color: "black",
                                          opening: "french",
                                          children: [
                                            {
                                              id: "fr-10c2",
                                              move: "Nf3",
                                              color: "white",
                                              opening: "french",
                                              children: [
                                                {
                                                  id: "fr-11c2",
                                                  move: "Nc6",
                                                  color: "black",
                                                  opening: "french",
                                                  children: [
                                                    {
                                                      id: "fr-12c2",
                                                      move: "Be3",
                                                      color: "white",
                                                      opening: "french",
                                                      children: [
                                                        {
                                                          id: "fr-13c2",
                                                          move: "cxd4",
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
                      color: "white",
                      opening: "french",
                      children: [
                        {
                          id: "fr-5d1",
                          move: "c5",
                          color: "black",
                          opening: "french",
                          children: [
                            {
                              id: "fr-6d1",
                              move: "exd5",
                              color: "white",
                              opening: "french",
                              children: [
                                {
                                  id: "fr-7d1",
                                  move: "exd5",
                                  color: "black",
                                  opening: "french",
                                  children: [
                                    {
                                      id: "fr-8d1",
                                      move: "Ngf3",
                                      color: "white",
                                      opening: "french",
                                      children: [
                                        {
                                          id: "fr-9d1",
                                          move: "Nc6",
                                          color: "black",
                                          opening: "french",
                                          children: [
                                            {
                                              id: "fr-10d1",
                                              move: "Bb5",
                                              color: "white",
                                              opening: "french",
                                              children: [
                                                {
                                                  id: "fr-11d1",
                                                  move: "Bd6",
                                                  color: "black",
                                                  opening: "french",
                                                  children: [
                                                    {
                                                      id: "fr-12d1",
                                                      move: "O-O",
                                                      color: "white",
                                                      opening: "french",
                                                      children: [
                                                        {
                                                          id: "fr-13d1",
                                                          move: "Nf6",
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
                          color: "black",
                          opening: "french",
                          children: [
                            {
                              id: "fr-6d2",
                              move: "e5",
                              color: "white",
                              opening: "french",
                              children: [
                                {
                                  id: "fr-7d2",
                                  move: "Nfd7",
                                  color: "black",
                                  opening: "french",
                                  children: [
                                    {
                                      id: "fr-8d2",
                                      move: "Bd3",
                                      color: "white",
                                      opening: "french",
                                      children: [
                                        {
                                          id: "fr-9d2",
                                          move: "c5",
                                          color: "black",
                                          opening: "french",
                                          children: [
                                            {
                                              id: "fr-10d2",
                                              move: "c3",
                                              color: "white",
                                              opening: "french",
                                              children: [
                                                {
                                                  id: "fr-11d2",
                                                  move: "Nc6",
                                                  color: "black",
                                                  opening: "french",
                                                  children: [
                                                    {
                                                      id: "fr-12d2",
                                                      move: "Ne2",
                                                      color: "white",
                                                      opening: "french",
                                                      children: [
                                                        {
                                                          id: "fr-13d2",
                                                          move: "cxd4",
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
          color: "black",
          opening: "caro_kann",
          children: [
            {
              id: "ck-2",
              move: "d4",
              color: "white",
              opening: "caro_kann",
              children: [
                {
                  id: "ck-3",
                  move: "d5",
                  color: "black",
                  opening: "caro_kann",
                  children: [
                    {
                      id: "ck-4a",
                      move: "Nc3",
                      color: "white",
                      opening: "caro_kann",
                      children: [
                        {
                          id: "ck-5a",
                          move: "dxe4",
                          color: "black",
                          opening: "caro_kann",
                          children: [
                            {
                              id: "ck-6a",
                              move: "Nxe4",
                              color: "white",
                              opening: "caro_kann",
                              children: [
                                {
                                  id: "ck-7a",
                                  move: "Bf5",
                                  color: "black",
                                  opening: "caro_kann",
                                  children: [
                                    {
                                      id: "ck-8a",
                                      move: "Ng3",
                                      color: "white",
                                      opening: "caro_kann",
                                      children: [
                                        {
                                          id: "ck-9a",
                                          move: "Bg6",
                                          color: "black",
                                          opening: "caro_kann",
                                          children: [
                                            {
                                              id: "ck-10a",
                                              move: "h4",
                                              color: "white",
                                              opening: "caro_kann",
                                              children: [
                                                {
                                                  id: "ck-11a",
                                                  move: "h6",
                                                  color: "black",
                                                  opening: "caro_kann",
                                                  children: [
                                                    {
                                                      id: "ck-12a",
                                                      move: "Nf3",
                                                      color: "white",
                                                      opening: "caro_kann",
                                                      children: [
                                                        {
                                                          id: "ck-13a",
                                                          move: "Nd7",
                                                          color: "black",
                                                          opening: "caro_kann",
                                                          children: [
                                                            {
                                                              id: "ck-14a",
                                                              move: "Bd3",
                                                              color: "white",
                                                              opening: "caro_kann",
                                                              children: [
                                                                {
                                                                  id: "ck-15a",
                                                                  move: "Bxd3",
                                                                  color: "black",
                                                                  opening: "caro_kann",
                                                                  children: [
                                                                    {
                                                                      id: "ck-16a",
                                                                      move: "Qxd3",
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
                      color: "white",
                      opening: "caro_kann",
                      children: [
                        {
                          id: "ck-5b",
                          move: "Bf5",
                          color: "black",
                          opening: "caro_kann",
                          children: [
                            {
                              id: "ck-6b",
                              move: "Nf3",
                              color: "white",
                              opening: "caro_kann",
                              children: [
                                {
                                  id: "ck-7b",
                                  move: "e6",
                                  color: "black",
                                  opening: "caro_kann",
                                  children: [
                                    {
                                      id: "ck-8b",
                                      move: "Be2",
                                      color: "white",
                                      opening: "caro_kann",
                                      children: [
                                        {
                                          id: "ck-9b",
                                          move: "Ne7",
                                          color: "black",
                                          opening: "caro_kann",
                                          children: [
                                            {
                                              id: "ck-10b",
                                              move: "O-O",
                                              color: "white",
                                              opening: "caro_kann",
                                              children: [
                                                {
                                                  id: "ck-11b",
                                                  move: "h6",
                                                  color: "black",
                                                  opening: "caro_kann",
                                                  children: [
                                                    {
                                                      id: "ck-12b",
                                                      move: "Nbd2",
                                                      color: "white",
                                                      opening: "caro_kann",
                                                      children: [
                                                        {
                                                          id: "ck-13b",
                                                          move: "Ng6",
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
                      color: "white",
                      opening: "caro_kann",
                      children: [
                        {
                          id: "ck-5c",
                          move: "cxd5",
                          color: "black",
                          opening: "caro_kann",
                          children: [
                            {
                              id: "ck-6c",
                              move: "Bd3",
                              color: "white",
                              opening: "caro_kann",
                              children: [
                                {
                                  id: "ck-7c",
                                  move: "Nc6",
                                  color: "black",
                                  opening: "caro_kann",
                                  children: [
                                    {
                                      id: "ck-8c",
                                      move: "c3",
                                      color: "white",
                                      opening: "caro_kann",
                                      children: [
                                        {
                                          id: "ck-9c",
                                          move: "Nf6",
                                          color: "black",
                                          opening: "caro_kann",
                                          children: [
                                            {
                                              id: "ck-10c",
                                              move: "Bf4",
                                              color: "white",
                                              opening: "caro_kann",
                                              children: [
                                                {
                                                  id: "ck-11c",
                                                  move: "Bg4",
                                                  color: "black",
                                                  opening: "caro_kann",
                                                  children: [
                                                    {
                                                      id: "ck-12c",
                                                      move: "Nf3",
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
                      color: "white",
                      opening: "caro_kann",
                      children: [
                        {
                          id: "ck-5d",
                          move: "e6",
                          color: "black",
                          opening: "caro_kann",
                          children: [
                            {
                              id: "ck-6d",
                              move: "Nc3",
                              color: "white",
                              opening: "caro_kann",
                              children: [
                                {
                                  id: "ck-7d",
                                  move: "Bb4",
                                  color: "black",
                                  opening: "caro_kann",
                                  children: [
                                    {
                                      id: "ck-8d",
                                      move: "Be3",
                                      color: "white",
                                      opening: "caro_kann",
                                      children: [
                                        {
                                          id: "ck-9d",
                                          move: "Ne7",
                                          color: "black",
                                          opening: "caro_kann",
                                          children: [
                                            {
                                              id: "ck-10d",
                                              move: "Qd2",
                                              color: "white",
                                              opening: "caro_kann",
                                              children: [
                                                {
                                                  id: "ck-11d",
                                                  move: "Bxc3",
                                                  color: "black",
                                                  opening: "caro_kann",
                                                  children: [
                                                    {
                                                      id: "ck-12d",
                                                      move: "Qxc3",
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
          color: "black",
          opening: "pirc",
          children: [
            {
              id: "pirc-2",
              move: "d4",
              color: "white",
              opening: "pirc",
              children: [
                {
                  id: "pirc-3",
                  move: "Nf6",
                  color: "black",
                  opening: "pirc",
                  children: [
                    {
                      id: "pirc-4",
                      move: "Nc3",
                      color: "white",
                      opening: "pirc",
                      children: [
                        {
                          id: "pirc-5",
                          move: "g6",
                          color: "black",
                          opening: "pirc",
                          children: [
                            {
                              id: "pirc-6a",
                              move: "f4",
                              color: "white",
                              opening: "pirc",
                              children: [
                                {
                                  id: "pirc-7a",
                                  move: "Bg7",
                                  color: "black",
                                  opening: "pirc",
                                  children: [
                                    {
                                      id: "pirc-8a",
                                      move: "Nf3",
                                      color: "white",
                                      opening: "pirc",
                                      children: [
                                        {
                                          id: "pirc-9a",
                                          move: "O-O",
                                          color: "black",
                                          opening: "pirc",
                                          children: [
                                            {
                                              id: "pirc-10a",
                                              move: "Be2",
                                              color: "white",
                                              opening: "pirc",
                                              children: [
                                                {
                                                  id: "pirc-11a",
                                                  move: "c5",
                                                  color: "black",
                                                  opening: "pirc",
                                                  children: [
                                                    {
                                                      id: "pirc-12a",
                                                      move: "dxc5",
                                                      color: "white",
                                                      opening: "pirc",
                                                      children: [
                                                        {
                                                          id: "pirc-13a",
                                                          move: "dxc5",
                                                          color: "black",
                                                          opening: "pirc",
                                                          children: [
                                                            {
                                                              id: "pirc-14a",
                                                              move: "O-O",
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
                              color: "white",
                              opening: "pirc",
                              children: [
                                {
                                  id: "pirc-7b",
                                  move: "Bg7",
                                  color: "black",
                                  opening: "pirc",
                                  children: [
                                    {
                                      id: "pirc-8b",
                                      move: "Be2",
                                      color: "white",
                                      opening: "pirc",
                                      children: [
                                        {
                                          id: "pirc-9b",
                                          move: "O-O",
                                          color: "black",
                                          opening: "pirc",
                                          children: [
                                            {
                                              id: "pirc-10b",
                                              move: "O-O",
                                              color: "white",
                                              opening: "pirc",
                                              children: [
                                                {
                                                  id: "pirc-11b",
                                                  move: "c6",
                                                  color: "black",
                                                  opening: "pirc",
                                                  children: [
                                                    {
                                                      id: "pirc-12b",
                                                      move: "a4",
                                                      color: "white",
                                                      opening: "pirc",
                                                      children: [
                                                        {
                                                          id: "pirc-13b",
                                                          move: "Nbd7",
                                                          color: "black",
                                                          opening: "pirc",
                                                          children: [
                                                            {
                                                              id: "pirc-14b",
                                                              move: "h3",
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
                              color: "white",
                              opening: "pirc",
                              children: [
                                {
                                  id: "pirc-7c",
                                  move: "Bg7",
                                  color: "black",
                                  opening: "pirc",
                                  children: [
                                    {
                                      id: "pirc-8c",
                                      move: "Qd2",
                                      color: "white",
                                      opening: "pirc",
                                      children: [
                                        {
                                          id: "pirc-9c",
                                          move: "O-O",
                                          color: "black",
                                          opening: "pirc",
                                          children: [
                                            {
                                              id: "pirc-10c",
                                              move: "O-O-O",
                                              color: "white",
                                              opening: "pirc",
                                              children: [
                                                {
                                                  id: "pirc-11c",
                                                  move: "c6",
                                                  color: "black",
                                                  opening: "pirc",
                                                  children: [
                                                    {
                                                      id: "pirc-12c",
                                                      move: "h4",
                                                      color: "white",
                                                      opening: "pirc",
                                                      children: [
                                                        {
                                                          id: "pirc-13c",
                                                          move: "b5",
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
          color: "black",
          opening: "alekhine",
          children: [
            {
              id: "al-2",
              move: "e5",
              color: "white",
              opening: "alekhine",
              children: [
                {
                  id: "al-3",
                  move: "Nd5",
                  color: "black",
                  opening: "alekhine",
                  children: [
                    {
                      id: "al-4",
                      move: "d4",
                      color: "white",
                      opening: "alekhine",
                      children: [
                        {
                          id: "al-5",
                          move: "d6",
                          color: "black",
                          opening: "alekhine",
                          children: [
                            {
                              id: "al-6a",
                              move: "Nf3",
                              color: "white",
                              opening: "alekhine",
                              children: [
                                {
                                  id: "al-7a",
                                  move: "dxe5",
                                  color: "black",
                                  opening: "alekhine",
                                  children: [
                                    {
                                      id: "al-8a",
                                      move: "Nxe5",
                                      color: "white",
                                      opening: "alekhine",
                                      children: [
                                        {
                                          id: "al-9a",
                                          move: "Nd7",
                                          color: "black",
                                          opening: "alekhine",
                                          children: [
                                            {
                                              id: "al-10a",
                                              move: "Nf3",
                                              color: "white",
                                              opening: "alekhine",
                                              children: [
                                                {
                                                  id: "al-11a",
                                                  move: "e6",
                                                  color: "black",
                                                  opening: "alekhine",
                                                  children: [
                                                    {
                                                      id: "al-12a",
                                                      move: "Be2",
                                                      color: "white",
                                                      opening: "alekhine",
                                                      children: [
                                                        {
                                                          id: "al-13a",
                                                          move: "Be7",
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
                              color: "white",
                              opening: "alekhine",
                              children: [
                                {
                                  id: "al-7b",
                                  move: "Nb6",
                                  color: "black",
                                  opening: "alekhine",
                                  children: [
                                    {
                                      id: "al-8b",
                                      move: "exd6",
                                      color: "white",
                                      opening: "alekhine",
                                      children: [
                                        {
                                          id: "al-9b",
                                          move: "exd6",
                                          color: "black",
                                          opening: "alekhine",
                                          children: [
                                            {
                                              id: "al-10b",
                                              move: "Nc3",
                                              color: "white",
                                              opening: "alekhine",
                                              children: [
                                                {
                                                  id: "al-11b",
                                                  move: "Be7",
                                                  color: "black",
                                                  opening: "alekhine",
                                                  children: [
                                                    {
                                                      id: "al-12b",
                                                      move: "Nf3",
                                                      color: "white",
                                                      opening: "alekhine",
                                                      children: [
                                                        {
                                                          id: "al-13b",
                                                          move: "O-O",
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
                              color: "white",
                              opening: "alekhine",
                              children: [
                                {
                                  id: "al-7c",
                                  move: "dxe5",
                                  color: "black",
                                  opening: "alekhine",
                                  children: [
                                    {
                                      id: "al-8c",
                                      move: "fxe5",
                                      color: "white",
                                      opening: "alekhine",
                                      children: [
                                        {
                                          id: "al-9c",
                                          move: "Nc6",
                                          color: "black",
                                          opening: "alekhine",
                                          children: [
                                            {
                                              id: "al-10c",
                                              move: "Nf3",
                                              color: "white",
                                              opening: "alekhine",
                                              children: [
                                                {
                                                  id: "al-11c",
                                                  move: "Bg4",
                                                  color: "black",
                                                  opening: "alekhine",
                                                  children: [
                                                    {
                                                      id: "al-12c",
                                                      move: "Be2",
                                                      color: "white",
                                                      opening: "alekhine",
                                                      children: [
                                                        {
                                                          id: "al-13c",
                                                          move: "e6",
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
      color: "white",
      opening: "root",
      children: [
        // ── GAMBITO DE DAMA ────────────────────────────────────────────────
        {
          id: "qg-1",
          move: "d5",
          color: "black",
          opening: "queens_gambit",
          children: [
            {
              id: "qg-2",
              move: "c4",
              color: "white",
              opening: "queens_gambit",
              children: [
                {
                  id: "qg-3a",
                  move: "dxc4",
                  color: "black",
                  opening: "queens_gambit",
                  children: [
                    {
                      id: "qg-4a",
                      move: "Nf3",
                      color: "white",
                      opening: "queens_gambit",
                      children: [
                        {
                          id: "qg-5a",
                          move: "Nf6",
                          color: "black",
                          opening: "queens_gambit",
                          children: [
                            {
                              id: "qg-6a1",
                              move: "e3",
                              color: "white",
                              opening: "queens_gambit",
                              children: [
                                { id: "qg-7a1", move: "e6", color: "black", opening: "queens_gambit", children: [
                                  { id: "qg-8a1", move: "Bxc4", color: "white", opening: "queens_gambit", children: [
                                    { id: "qg-9a1", move: "c5", color: "black", opening: "queens_gambit", children: [
                                      { id: "qg-10a1", move: "O-O", color: "white", opening: "queens_gambit", children: [
                                        { id: "qg-11a1", move: "a6", color: "black", opening: "queens_gambit", children: [
                                          { id: "qg-12a1", move: "Qe2", color: "white", opening: "queens_gambit", children: [] }
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
                              color: "white",
                              opening: "queens_gambit",
                              children: [
                                { id: "qg-7a2", move: "e6", color: "black", opening: "queens_gambit", children: [
                                  { id: "qg-8a2", move: "e4", color: "white", opening: "queens_gambit", children: [
                                    { id: "qg-9a2", move: "c5", color: "black", opening: "queens_gambit", children: [
                                      { id: "qg-10a2", move: "e5", color: "white", opening: "queens_gambit", children: [
                                        { id: "qg-11a2", move: "Nd5", color: "black", opening: "queens_gambit", children: [
                                          { id: "qg-12a2", move: "Nb5", color: "white", opening: "queens_gambit", children: [] }
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
                  color: "black",
                  opening: "queens_gambit",
                  children: [
                    {
                      id: "qg-4b",
                      move: "Nc3",
                      color: "white",
                      opening: "queens_gambit",
                      children: [
                        {
                          id: "qg-5b",
                          move: "Nf6",
                          color: "black",
                          opening: "queens_gambit",
                          children: [
                            {
                              id: "qg-6b",
                              move: "Bg5",
                              color: "white",
                              opening: "queens_gambit",
                              children: [
                                {
                                  id: "qg-7b1",
                                  move: "Be7",
                                  color: "black",
                                  opening: "queens_gambit",
                                  children: [
                                    { id: "qg-8b1", move: "Nf3", color: "white", opening: "queens_gambit", children: [
                                      { id: "qg-9b1", move: "O-O", color: "black", opening: "queens_gambit", children: [
                                        { id: "qg-10b1", move: "e3", color: "white", opening: "queens_gambit", children: [
                                          { id: "qg-11b1", move: "Nbd7", color: "black", opening: "queens_gambit", children: [
                                            { id: "qg-12b1", move: "Bd3", color: "white", opening: "queens_gambit", children: [
                                              { id: "qg-13b1", move: "dxc4", color: "black", opening: "queens_gambit", children: [
                                                { id: "qg-14b1", move: "Bxc4", color: "white", opening: "queens_gambit", children: [] }
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
                                  color: "black",
                                  opening: "queens_gambit",
                                  children: [
                                    { id: "qg-8b2", move: "Nf3", color: "white", opening: "queens_gambit", children: [
                                      { id: "qg-9b2", move: "c6", color: "black", opening: "queens_gambit", children: [
                                        { id: "qg-10b2", move: "cxd5", color: "white", opening: "queens_gambit", children: [
                                          { id: "qg-11b2", move: "Nxd5", color: "black", opening: "queens_gambit", children: [
                                            { id: "qg-12b2", move: "Bd2", color: "white", opening: "queens_gambit", children: [
                                              { id: "qg-13b2", move: "Bb4", color: "black", opening: "queens_gambit", children: [] }
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
                  color: "black",
                  opening: "queens_gambit",
                  children: [
                    {
                      id: "qg-4c",
                      move: "Nf3",
                      color: "white",
                      opening: "queens_gambit",
                      children: [
                        {
                          id: "qg-5c",
                          move: "Nf6",
                          color: "black",
                          opening: "queens_gambit",
                          children: [
                            {
                              id: "qg-6c",
                              move: "Nc3",
                              color: "white",
                              opening: "queens_gambit",
                              children: [
                                {
                                  id: "qg-7c1",
                                  move: "dxc4",
                                  color: "black",
                                  opening: "queens_gambit",
                                  children: [
                                    { id: "qg-8c1", move: "e4", color: "white", opening: "queens_gambit", children: [
                                      { id: "qg-9c1", move: "b5", color: "black", opening: "queens_gambit", children: [
                                        { id: "qg-10c1", move: "a4", color: "white", opening: "queens_gambit", children: [
                                          { id: "qg-11c1", move: "b4", color: "black", opening: "queens_gambit", children: [
                                            { id: "qg-12c1", move: "Na2", color: "white", opening: "queens_gambit", children: [
                                              { id: "qg-13c1", move: "e6", color: "black", opening: "queens_gambit", children: [] }
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
                                  color: "black",
                                  opening: "queens_gambit",
                                  children: [
                                    { id: "qg-8c2", move: "e4", color: "white", opening: "queens_gambit", children: [
                                      { id: "qg-9c2", move: "dxe4", color: "black", opening: "queens_gambit", children: [
                                        { id: "qg-10c2", move: "Nxe4", color: "white", opening: "queens_gambit", children: [
                                          { id: "qg-11c2", move: "Bb4+", color: "black", opening: "queens_gambit", children: [
                                            { id: "qg-12c2", move: "Bd2", color: "white", opening: "queens_gambit", children: [
                                              { id: "qg-13c2", move: "Qxd4", color: "black", opening: "queens_gambit", children: [] }
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
              color: "white",
              opening: "london",
              children: [
                {
                  id: "lon-3",
                  move: "Nf6",
                  color: "black",
                  opening: "london",
                  children: [
                    {
                      id: "lon-4",
                      move: "Bf4",
                      color: "white",
                      opening: "london",
                      children: [
                        {
                          id: "lon-5",
                          move: "e6",
                          color: "black",
                          opening: "london",
                          children: [
                            {
                              id: "lon-6",
                              move: "e3",
                              color: "white",
                              opening: "london",
                              children: [
                                {
                                  id: "lon-7a",
                                  move: "Be7",
                                  color: "black",
                                  opening: "london",
                                  children: [
                                    { id: "lon-8a", move: "Bd3", color: "white", opening: "london", children: [
                                      { id: "lon-9a", move: "O-O", color: "black", opening: "london", children: [
                                        { id: "lon-10a", move: "c3", color: "white", opening: "london", children: [
                                          { id: "lon-11a", move: "c5", color: "black", opening: "london", children: [
                                            { id: "lon-12a", move: "Nbd2", color: "white", opening: "london", children: [
                                              { id: "lon-13a", move: "Nc6", color: "black", opening: "london", children: [] }
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
                                  color: "black",
                                  opening: "london",
                                  children: [
                                    { id: "lon-8b", move: "c3", color: "white", opening: "london", children: [
                                      { id: "lon-9b", move: "Nc6", color: "black", opening: "london", children: [
                                        { id: "lon-10b", move: "Nbd2", color: "white", opening: "london", children: [
                                          { id: "lon-11b", move: "Qb6", color: "black", opening: "london", children: [
                                            { id: "lon-12b", move: "Qb3", color: "white", opening: "london", children: [] }
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
          color: "black",
          opening: "kings_indian",
          children: [
            {
              id: "ki-2",
              move: "c4",
              color: "white",
              opening: "kings_indian",
              children: [
                {
                  id: "ki-3a",
                  move: "g6",
                  color: "black",
                  opening: "kings_indian",
                  children: [
                    {
                      id: "ki-4a",
                      move: "Nc3",
                      color: "white",
                      opening: "kings_indian",
                      children: [
                        {
                          id: "ki-5a",
                          move: "Bg7",
                          color: "black",
                          opening: "kings_indian",
                          children: [
                            {
                              id: "ki-6a",
                              move: "e4",
                              color: "white",
                              opening: "kings_indian",
                              children: [
                                {
                                  id: "ki-7a",
                                  move: "d6",
                                  color: "black",
                                  opening: "kings_indian",
                                  children: [
                                    {
                                      id: "ki-8a1",
                                      move: "Nf3",
                                      color: "white",
                                      opening: "kings_indian",
                                      children: [
                                        {
                                          id: "ki-9a1",
                                          move: "O-O",
                                          color: "black",
                                          opening: "kings_indian",
                                          children: [
                                            {
                                              id: "ki-10a1",
                                              move: "Be2",
                                              color: "white",
                                              opening: "kings_indian",
                                              children: [
                                                {
                                                  id: "ki-11a1",
                                                  move: "e5",
                                                  color: "black",
                                                  opening: "kings_indian",
                                                  children: [
                                                    { id: "ki-12a1", move: "d5", color: "white", opening: "kings_indian", children: [
                                                      { id: "ki-13a1", move: "Nh5", color: "black", opening: "kings_indian", children: [
                                                        { id: "ki-14a1", move: "g3", color: "white", opening: "kings_indian", children: [
                                                          { id: "ki-15a1", move: "Nf4", color: "black", opening: "kings_indian", children: [
                                                            { id: "ki-16a1", move: "O-O", color: "white", opening: "kings_indian", children: [
                                                              { id: "ki-17a1", move: "g5", color: "black", opening: "kings_indian", children: [] }
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
                                      color: "white",
                                      opening: "kings_indian",
                                      children: [
                                        {
                                          id: "ki-9a2",
                                          move: "O-O",
                                          color: "black",
                                          opening: "kings_indian",
                                          children: [
                                            {
                                              id: "ki-10a2",
                                              move: "Be3",
                                              color: "white",
                                              opening: "kings_indian",
                                              children: [
                                                { id: "ki-11a2", move: "Nbd7", color: "black", opening: "kings_indian", children: [
                                                  { id: "ki-12a2", move: "Qd2", color: "white", opening: "kings_indian", children: [
                                                    { id: "ki-13a2", move: "c5", color: "black", opening: "kings_indian", children: [
                                                      { id: "ki-14a2", move: "d5", color: "white", opening: "kings_indian", children: [
                                                        { id: "ki-15a2", move: "Ne5", color: "black", opening: "kings_indian", children: [
                                                          { id: "ki-16a2", move: "f4", color: "white", opening: "kings_indian", children: [
                                                            { id: "ki-17a2", move: "Neg4", color: "black", opening: "kings_indian", children: [] }
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
                  color: "black",
                  opening: "nimzo",
                  children: [
                    {
                      id: "nim-4b",
                      move: "Nc3",
                      color: "white",
                      opening: "nimzo",
                      children: [
                        {
                          id: "nim-5b",
                          move: "Bb4",
                          color: "black",
                          opening: "nimzo",
                          children: [
                            {
                              id: "nim-6b1",
                              move: "Qc2",
                              color: "white",
                              opening: "nimzo",
                              children: [
                                {
                                  id: "nim-7b1",
                                  move: "O-O",
                                  color: "black",
                                  opening: "nimzo",
                                  children: [
                                    { id: "nim-8b1", move: "a3", color: "white", opening: "nimzo", children: [
                                      { id: "nim-9b1", move: "Bxc3+", color: "black", opening: "nimzo", children: [
                                        { id: "nim-10b1", move: "Qxc3", color: "white", opening: "nimzo", children: [
                                          { id: "nim-11b1", move: "d5", color: "black", opening: "nimzo", children: [
                                            { id: "nim-12b1", move: "cxd5", color: "white", opening: "nimzo", children: [
                                              { id: "nim-13b1", move: "Nxd5", color: "black", opening: "nimzo", children: [] }
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
                              color: "white",
                              opening: "nimzo",
                              children: [
                                {
                                  id: "nim-7b2",
                                  move: "O-O",
                                  color: "black",
                                  opening: "nimzo",
                                  children: [
                                    {
                                      id: "nim-8b2",
                                      move: "Bd3",
                                      color: "white",
                                      opening: "nimzo",
                                      children: [
                                        { id: "nim-9b2", move: "c5", color: "black", opening: "nimzo", children: [
                                          { id: "nim-10b2", move: "Nf3", color: "white", opening: "nimzo", children: [
                                            { id: "nim-11b2", move: "d5", color: "black", opening: "nimzo", children: [
                                              { id: "nim-12b2", move: "O-O", color: "white", opening: "nimzo", children: [
                                                { id: "nim-13b2", move: "a6", color: "black", opening: "nimzo", children: [
                                                  { id: "nim-14b2", move: "cxd5", color: "white", opening: "nimzo", children: [] }
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
