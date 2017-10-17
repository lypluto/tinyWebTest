
const supportedPaymentMethods = [  
  {  
    supportedMethods: ['basic-card'],  
  }  
];  

const paymentDetails = {  
  total: {
    label: 'Total',  
    amount:{  
      currency: 'USD',  
      value: 0  
    }  
  }
};  

// Options isn't required.  
const options = {};



var supportedInstruments = [
  {
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['amex', 'discover', 'mastercard', 'visa']
    }
  },
  {
    supportedMethods: ['https://android.com/pay'],
    data: {
      //merchant ID obtained from Google that maps to your origin
      merchantId: '02510116604241796260',
      environment: 'TEST',
      // Credit Cards allowed via Android Pay
      allowedCardNetworks: ['AMEX', 'MASTERCARD', 'VISA', 'DISCOVER'],
      paymentMethodTokenizationParameters: {
        tokenizationType: 'GATEWAY_TOKEN',
        parameters: {
          'gateway': 'stripe',
          // Place your own Stripe publishable key here.
          'stripe:publishableKey': 'pk_live_fD7ggZCtrB0vJNApRX5TyJ9T',
          'stripe:version': '2016-07-06'
        }
      }
    }
  }
];


/**
 * click event of Test button
 */
function onTestBtnClicked() {
    console.log("onTestBtnClicked()...");

    if (!window.PaymentRequest) {
        console.log("buildSimplePaymentRequest: PaymentRequest API is not available!");
        alert('PaymentRequest API is not available!');
        return null;
    }
    
    const request = new PaymentRequest(  
      supportedPaymentMethods,  
      paymentDetails,  
      options  
    );
    
    request.show()  
    .then(function(response) {
      // Process response
      response.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });
}
