type Pokemon = {
    "id": number,
    "pokedexId": number,
    "name": string,
    "image": string,
    "sprite": string,
    "slug": string,
    "stats": {
      "HP": number,
      "attack": number,
      "defense": number,
      "special_attack": number,
      "special_defense": number,
      "speed": number
    },
    "apiTypes": [
      {
        "name": string,
        "image": string
      },
      {
        "name": string,
        "image": string
      }
    ],
    "apiGeneration": number,
    "apiResistances": [
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string,
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      },
      {
        "name": string,
        "damage_multiplier": number,
        "damage_relation": string
      }
    ],
    "resistanceModifyingAbilitiesForApi": [],
    "apiEvolutions": [
      {
        "name": string,
        "pokedexId": number
      }
    ],
    "apiPreEvolution": string,
    "apiResistancesWithAbilities": []
  };

  export default Pokemon