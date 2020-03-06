import React from 'react';
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from './types';
import { useQuery, useMutation } from '../../lib/api';

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
  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListings = async (id: string) => {
    await deleteListing({ id });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map(listing => (
        <li key={listing.id}>
          {listing.title}{' '}
          <button
            type='button'
            onClick={() => handleDeleteListings(listing.id)}
          >
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
  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;
  const deleteListingLoadingError = deleteListingError ? (
    <h4>Something went wrong with deleting.</h4>
  ) : null;
  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingLoadingError}
    </div>
  );
};
