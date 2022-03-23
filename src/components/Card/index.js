import './style.css'
import CardBack from '../../assets/card-back.png'

function Card({ card, stateCards, setStateCards }) {

    function handleTurnCard() {
        const localCards = [...stateCards];

        const currentCard = localCards.find((item) => item.id === card.id);
        
        const onlyTurnedCards = localCards.filter((item) => item.turned);

        if (onlyTurnedCards.length > 1) {
            return;
        }

        if (onlyTurnedCards.length && card.slug === onlyTurnedCards[0].slug) {
            currentCard.turned = !currentCard.turned;
            setStateCards(localCards);

            setTimeout(() => {
                if (currentCard.id === onlyTurnedCards[0].id) {
                return;
                }

                const filteredCards = localCards.filter((item) => 
                    item.id !== currentCard.id && item.id !== onlyTurnedCards[0].id);
                
                setStateCards(filteredCards);

            }, 800);

            return;
        }

        currentCard.turned = !currentCard.turned;
        setStateCards(localCards);

        if (onlyTurnedCards.length) {
            setTimeout(() => {
                localCards.forEach((item) => {
                    item.turned = false;
                });

                setStateCards([...localCards])
            }, 800);
        }
    }

    return (
        <img 
            className='card'
            src={card.turned ? card.image : CardBack}
            alt="card"
            onClick={() => handleTurnCard()}
        />
    )
}

export default Card;