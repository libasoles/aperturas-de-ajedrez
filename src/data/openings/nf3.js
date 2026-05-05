export const NF3_TREE = {
  id: "nf3",
  move: "Nf3",
  color: "white",
  opening: "zukertort",
  children: [
    // Main line: 1...d5 (Zukertort proper)
    {
      id: "zuk-1",
      move: "d5",
      color: "black",
      opening: "zukertort",
      children: [
        {
          id: "zuk-2",
          move: "b3",
          color: "white",
          opening: "zukertort",
          children: [
            // Branch A: 2...Nf6
            {
              id: "zuk-3a",
              move: "Nf6",
              color: "black",
              opening: "zukertort",
              children: [
                {
                  id: "zuk-4a",
                  move: "Bb2",
                  color: "white",
                  opening: "zukertort",
                  children: [
                    // Aa: Classical (3...e6)
                    {
                      id: "zuk-5a",
                      move: "e6",
                      color: "black",
                      opening: "zukertort",
                      children: [
                        {
                          id: "zuk-6a",
                          move: "e3",
                          color: "white",
                          opening: "zukertort",
                          children: [
                            {
                              id: "zuk-7a",
                              move: "Be7",
                              color: "black",
                              opening: "zukertort",
                              children: [
                                {
                                  id: "zuk-8a",
                                  move: "d4",
                                  color: "white",
                                  opening: "zukertort",
                                  children: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    // Ab: Double Fianchetto / Nimzo-Larsen (3...g6)
                    {
                      id: "zuk-5b",
                      move: "g6",
                      color: "black",
                      opening: "zukertort",
                      children: [
                        {
                          id: "zuk-6b",
                          move: "g3",
                          color: "white",
                          opening: "zukertort",
                          children: [
                            {
                              id: "zuk-7b",
                              move: "Bg7",
                              color: "black",
                              opening: "zukertort",
                              children: [
                                {
                                  id: "zuk-8b",
                                  move: "Bg2",
                                  color: "white",
                                  opening: "zukertort",
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
            // Branch B: 2...c5 (Reversed Pirc)
            {
              id: "zuk-3b",
              move: "c5",
              color: "black",
              opening: "zukertort",
              children: [
                {
                  id: "zuk-4b",
                  move: "Bb2",
                  color: "white",
                  opening: "zukertort",
                  children: [
                    {
                      id: "zuk-5c",
                      move: "Nc6",
                      color: "black",
                      opening: "zukertort",
                      children: [
                        {
                          id: "zuk-6c",
                          move: "e3",
                          color: "white",
                          opening: "zukertort",
                          children: [
                            {
                              id: "zuk-7c",
                              move: "e5",
                              color: "black",
                              opening: "zukertort",
                              children: [
                                {
                                  id: "zuk-8c",
                                  move: "d4",
                                  color: "white",
                                  opening: "zukertort",
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
    // Ross Gambit: 1...e5 2.Nxe5
    {
      id: "zuk-1b",
      move: "e5",
      color: "black",
      opening: "zukertort",
      children: [
        {
          id: "zuk-2b",
          move: "Nxe5",
          color: "white",
          opening: "zukertort",
          children: [
            {
              id: "zuk-3c",
              move: "d6",
              color: "black",
              opening: "zukertort",
              children: [
                {
                  id: "zuk-4c",
                  move: "Nf3",
                  color: "white",
                  opening: "zukertort",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
