import { useState } from "react";
import {
    AppRoot,
    SplitLayout,
    View,
    Panel,
    PanelHeader,
    usePlatform,
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Div,
    Text,
    Spacing
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import MovieList from "./components/MovieList";

const App = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const platform = usePlatform();

    const closeModal = () => {
        setActiveModal(null);
    };

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setActiveModal('movieCard');
    };

    return (
        <AppRoot>
            <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
                <View activePanel="main">
                    <Panel id="main">
                        <PanelHeader>Кино справочник</PanelHeader>
                        <MovieList onOpenModal={openModal} />
                    </Panel>
                </View>
                {/* TODO: Перенести модальное окно в отдельный компонент */}
                <ModalRoot activeModal={activeModal}>
                    {selectedMovie && (
                        <ModalPage
                            id="movieCard"
                            onClose={closeModal}
                            header={
                                <ModalPageHeader
                                    left={
                                        <PanelHeaderButton onClick={closeModal}>
                                            Закрыть
                                        </PanelHeaderButton>
                                    }
                                >
                                    {selectedMovie.name}
                                </ModalPageHeader>
                            }
                        >
                            <Div>
                                <Text>Описание: {selectedMovie.description}</Text>
                                <Spacing size={16} />
                                <Text>Жанры: {selectedMovie.genres.map(genre => genre.name).join(", ")}</Text>
                                <Text>Рейтинг: {selectedMovie.rating.kp}</Text>
                            </Div>
                        </ModalPage>
                    )}
                </ModalRoot>
            </SplitLayout>
        </AppRoot>
    );
};

export default App;
