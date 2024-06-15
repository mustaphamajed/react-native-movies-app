import React from 'react';
import { render, fireEvent, waitFor,getByTestId } from '@testing-library/react-native';

import { useNavigation } from '@react-navigation/native';
import useMovies from '../src/hooks/useMovies';
import HomeScreen from '../src/screens/Home/homeScreen';

jest.mock('../src/hooks/useMovies');
jest.mock('@react-navigation/native');

const mockMovies = [
  { imdbID: 'tt0111161', Title: 'The Shawshank Redemption', Poster: 'N/A' },
  { imdbID: 'tt0068646', Title: 'The Godfather', Poster: 'N/A' },
];

const mockUseMovies = {
  movies: mockMovies,
  loading: false,
  refreshing: false,
  hasMore: true,
  searchTerm: '',
  setSearchTerm: jest.fn(),
  loadMoreMovies: jest.fn(),
  refreshMovies: jest.fn(),
};

describe('HomeScreen', () => {
  beforeEach(() => {
    useMovies.mockReturnValue(mockUseMovies);
    useNavigation.mockReturnValue({ navigate: jest.fn() });
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<HomeScreen />);

    expect(getByPlaceholderText('Search movies...')).toBeTruthy();
    expect(getByText('The Shawshank Redemption')).toBeTruthy();
    expect(getByText('The Godfather')).toBeTruthy();
  });

  it('calls setSearchTerm when search input changes', () => {
    const { getByPlaceholderText } = render(<HomeScreen />);
    const searchInput = getByPlaceholderText('Search movies...');

    fireEvent.changeText(searchInput, 'Godfather');

    expect(mockUseMovies.setSearchTerm).toHaveBeenCalledWith('Godfather');
  });



  it('calls refreshMovies on pull to refresh', () => {
    const { getByTestId } = render(<HomeScreen />);
    const flatList = getByTestId('flat-list');

    fireEvent(flatList, 'refresh');

    expect(mockUseMovies.refreshMovies).toHaveBeenCalled();
  });

  it('navigates to details screen on movie card press', () => {
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });
    const { getByText } = render(<HomeScreen />);
    const movieItem = getByText('The Shawshank Redemption');

    fireEvent.press(movieItem);

    expect(mockNavigate).toHaveBeenCalledWith('Details', { id: 'tt0111161' });
  });

  it('displays loading indicator when loading more movies', () => {
    useMovies.mockReturnValue({ ...mockUseMovies, loading: true });
    const { getByTestId } = render(<HomeScreen />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
