import shoppingImg from '../assets/shopping1.svg'
import marketingImg from '../assets/marketing.svg'
import saveMoneyImg from '../assets/save-money.svg'

const modelContent = [
    {
        number : 1,
        text : [
            "Your favorite products are just a click away. Shop now and enjoy the convenience",
            "Your satisfaction is our priority. We're here to provide exceptional service and support every step of the way.",
        ],
        image : shoppingImg,
        order : "textFirst"
    },
    {
        number : 2,
        text : [
            "Discover the joy of shopping with us! Find everything you need in one place.",
            "Your favorite products are just a click away. Shop now and enjoy the convenience.",
        ],
        image : marketingImg,
        order : "imageFirst"
    },
    {
        number : 3,
        text : [
            "Save more with our exclusive offers and discounts, designed to give you the best value for your money.",
            " Shop smarter and experience the convenience of efficient, budget-friendly shopping!",
        ],
        image : saveMoneyImg,
        order : "textFirst"
    },
]

export default modelContent;