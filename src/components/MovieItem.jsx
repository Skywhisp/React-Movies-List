import PropTypes from "prop-types";
import {Div, Title, Text, Image, Tappable} from "@vkontakte/vkui";

const MovieItem = ({ movie, onOpenModal }) => {
    const handleItemClick = () => {
        onOpenModal(movie);
    };

    return (
        <Tappable onClick={handleItemClick}>
            <Div>
                <Image heightSize={400} widthSize={300} src={movie.poster.url} />
                <Title>{movie.name}</Title>
                <Text>Рейтинг: {movie.rating.kp}</Text>
            </Div>
        </Tappable>
    );
};

MovieItem.propTypes = {
    movie: PropTypes.shape({
        name: PropTypes.string,
        poster: PropTypes.shape({
            url: PropTypes.string
        }),
        rating: PropTypes.shape({
            kp: PropTypes.number
        }),
        genres: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string
        }))
    }),
    onOpenModal: PropTypes.func.isRequired
};

export default MovieItem;
