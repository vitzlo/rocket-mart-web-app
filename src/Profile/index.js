import { Link } from "react-router-dom";
import { getMonthName } from "../Utils";
import "./index.css";

function Profile() {
  const username = "Brando";
  const region = "Ryder Hall, MA";
  const joinDate = new Date(2023, 11, 17);

  const purchasedPokemon = [
    {
      purchaseId: 727,
      timeOfPurchase: new Date(2023, 11, 18, 10, 33),
      buyerId: 528,
      sellerId: 491,
      pokemon: {
        id: 132,
        name: "ditto",
        height: 0.3,
        weight: 4,
        types: ["normal"],
        sprites: {
          large:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
          small:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
        },
      },
    },
  ];
  const listedPokemon = [
    {
      timeOfListing: new Date(2023, 11, 17, 19, 33),
      sellerId: 491,
      pokemon: {
        id: 132,
        name: "ditto",
        height: 0.3,
        weight: 4,
        types: ["normal"],
        sprites: {
          large:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
          small:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
        },
      },
    },
    {
      timeOfListing: new Date(2023, 11, 17, 19, 34),
      sellerId: 491,
      pokemon: {
        id: 25,
        name: "pikachu",
        height: 0.4,
        weight: 6,
        types: ["electric"],
        sprites: {
          large:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
          small:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        },
      },
    },
  ];
  const soldPokemon = [
    {
      timeOfListing: new Date(2023, 11, 18, 10, 33),
      sellerId: 491,
      pokemon: {
        id: 132,
        name: "ditto",
        height: 0.3,
        weight: 4,
        types: ["normal"],
        sprites: {
          large:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
          small:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
        },
      },
    },
  ];

  return (
    <div className="row">
      <div className="col-6 col-sm-6">
        <img
          src="https://www.svgrepo.com/show/135058/circle-outline.svg"
          alt="pfp icon"
          id="profile-picture"
        />
        <div>{`@${username} | ${region}`}</div>
        <div className="private-both">
          <div>Email: xie.br@northeastern.edu</div>
          <div>Phone: 800-588-2300</div>
        </div>
        <div>
          Joined {getMonthName(joinDate.getMonth())} {joinDate.getDate()},{" "}
          {joinDate.getFullYear()}
        </div>
      </div>
      <div className="col-6 col-sm-6">
        <h1 className="private-buyer">[BUYER] Purchased Pokémon</h1>
        {purchasedPokemon.map((purchase) => {
          return (
            <div>
              <Link to={`/details/${purchase.pokemon.id}`}>
                {purchase.pokemon.name}
              </Link>
            </div>
          );
        })}
        <h1>[SELLER] Listed Pokémon</h1>
        {listedPokemon.map((listing) => {
          return (
            <div>
              <Link to={`/details/${listing.pokemon.id}`}>
                {listing.pokemon.name}
              </Link>
            </div>
          );
        })}
        <h1 className="private-seller">[SELLER] Sold Pokémon</h1>
        {soldPokemon.map((purchase) => {
          return (
            <div>
              <Link to={`/details/${purchase.pokemon.id}`}>
                {purchase.pokemon.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Profile;
