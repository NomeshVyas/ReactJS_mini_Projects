import React, { useState,useEffect } from 'react';
import { Card,
    Form,
    Input,
    Watermark,
    Select
} from 'antd';

function Converter() {
    const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";
		const [cryptolist, setCryptolist] = useState([]);

		useEffect(() => {
			fetchData()
		}, [])
		

    async function fetchData () {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
				const data = await jsonData.rates;
        
        const tempArray = Object.entries(data).map(item=>{
            return {
							value: item[1].name,
							label: item[1].name,
							rate: item[1].value
            }
        })
				console.log(tempArray);
				setCryptolist(tempArray);
    }

  return (
      
    <Watermark image='https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024'>
    <div className='container'>
    <Card  style={{ minWidth: "400px", zIndex: "10" }} title={<h2><img style={{width: "30px"}} src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024" alt="" /> <span style={{color: "#4d4d4d"}}>Crypto Converter</span></h2>} >
    <Form>
        <Form.Item>
            <Input placeholder='Enter the Value' onChange={fetchData} />
        </Form.Item>
    </Form>
    <div className="flex-justify-sb">
    <Select
      defaultValue="Bitcoin"
      style={{ width: "150px" }}
      options={cryptolist}
    />
    <Select
      defaultValue="Ether"
      style={{ width: "150px" }}
      options={cryptolist}
        />
        </div>
		<p style={{textAlign: "center", fontSize: "1.5rem", color: "#34d4d4d", textShadow: "1px -1px orange"}}>1 Bitcoin = 14.488 Ether</p>
    </Card>
    </div>
    </Watermark>
  )
}

export default Converter