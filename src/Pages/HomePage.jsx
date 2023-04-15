import './homePageStyle.css'

const welcomeTextStyle = {
    margin: "5%",
    padding:"5px",
    borderStyle: "solid",
    borderWidth: "medium",
    borderColor: "red",
    fontSize:"2em",
}

export default function HomePage() {
    return (
        <div>
            <div style={welcomeTextStyle}>
                Welcome to our home page! This is the homepage of our webpage where you can 
            access all functionalities necessary for buying goods by other vendors. Feel free to click one of 
            the underlying functions: 1. consulting products, 2. consulting profile, 
            3. track & trace an order, 4. consult an order, 5. consult notifications, 6. make an order.
            Warning: for most functionalities, you need to be logged in!
            </div>
            <div className="container">
                <div className="row">
                    <div className="col" >
                        <img src="../../public/images/productsHomePage.png" alt="resembles products"/>
                        <div>
                            Go to consulting products.
                        </div>
                    </div>
                    <div className="col">
                        <img src="../../public/images/profileHomePage.png" alt="resembles profile"/>
                        <div>
                            Go to consulting profile.
                        </div>
                    </div>
                    <div className='col'>
                        <img src="../../public/images/track&traceHomePage.png" alt="resembles track & trace"/>
                        <div>
                            Go to track & tracing an order.
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div className="col">
                        <img src="../../public/images/consultingOrderHomePage.png" alt="resembles consulting order"/>
                        <div>
                            Go to consulting orders.
                        </div>
                    </div>
                    <div className="col">
                        <img src="../../public/images/notificationHomePage.png" alt="resembles notification"/>
                        <div>
                            Go to consulting notifications.
                        </div>
                    </div>
                    <div className="col">
                        <img src="../../public/images/makingOrderHomePage.png" alt="resembles making order"/>
                        <div>
                            Go to making an order.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )

}