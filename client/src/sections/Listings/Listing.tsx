import React from 'react';
import { server } from '../../lib/api';
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from './types';
import { useQuery } from '../../lib/api';

const LISTINGS = `
  query Listings {
    listings {
    id
    title
    image
    address
    price
    numOfGuests
    numOfBeds
    numOfBaths
    rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);

  const deleteListings = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: { id },
    });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map(listing => (
        <li key={listing.id}>
          {listing.title}{' '}
          <button type='button' onClick={() => deleteListings(listing.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : null;
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
    </div>
  );
};
