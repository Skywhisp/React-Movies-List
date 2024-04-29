import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Group, Title, HorizontalScroll, Div, Spinner, Pagination } from "@vkontakte/vkui";
import { fetchMovies } from "../api";
import MovieItem from "./MovieItem";

const MovieList = ({ onOpenModal }) => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMoviesData = async () => {
            try {
                const data = await fetchMovies(currentPage);
                if (data.docs && Array.isArray(data.docs)) {
                    setMovies(data.docs);
                } else {
                    console.error("Неверный формат данных:", data);
                }
            } catch (error) {
                console.error("Не удалось загрузить фильмы:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMoviesData();
    }, [currentPage]);

    const openModal = (movie) => {
        onOpenModal(movie);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <Group>
            <Div>
                <Title>Лучшие фильмы и сериалы</Title>
            </Div>
            <Pagination
                currentPage={currentPage}
                totalPages={10}
                onChange={handlePageChange}
            />
            <HorizontalScroll>
                <Div style={{ display: 'flex' }}>
                    {isLoading ? (
                        <Spinner size="large" />
                    ) : (
                        movies.map((movie, index) => (
                            <MovieItem key={index} movie={movie} onOpenModal={openModal} />
                        ))
                    )}
                </Div>
            </HorizontalScroll>
        </Group>
    );
};

MovieList.propTypes = {
    onOpenModal: PropTypes.func.isRequired
};

export default MovieList;
