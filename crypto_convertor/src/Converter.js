import React, { useState,useEffect } from 'react';
import { Card,
    Form,
    Input,
    Watermark,
    Select
} from 'antd';

function Converter() {
    const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";

    const defaultFirstSelectValue = "Bitcoin";
    const defaultSecondSelectValue = "Ether"

    const [inputValue, setInputValue] = useState(0);
    const [firstSelect, setFirstSelect] = useState(defaultFirstSelectValue);
    const [secondSelect, setSecondSelect] = useState(defaultSecondSelectValue);
		const [cryptolist, setCryptolist] = useState([]);
    const [result, setResult] = useState(0)

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
        setCryptolist(tempArray)
    }

    useEffect(()=>{
      if(cryptolist.length===0) return;

      const firstSelectRate = cryptolist.find((item)=>{
        return item.value === firstSelect
      }).rate;
      
      const secondSelectRate = cryptolist.find((item)=>{
        return item.value === secondSelect
      }).rate;

      const resultValue = (inputValue*secondSelectRate)/firstSelectRate;
      if(Number.isInteger(resultValue)){
        setResult(resultValue);
      }else{
        setResult(resultValue.toFixed(4));
      }
      // eslint-disable-next-line
    }, [inputValue, firstSelect, secondSelect])

  return (
      
    <Watermark image='https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024'>
    <div className='container'>
    <Card className='crypto-card' title={<h2><img style={{width: "30px"}} src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024" alt="" /> <span style={{color: "#4d4d4d"}}>Crypto Converter</span></h2>} >
    <Form>
        <Form.Item>
            <Input style={{fontWeight: "600"}} type='number' placeholder='Enter the Value' onChange={(e)=>{setInputValue(e.target.value)}} />
        </Form.Item>
    </Form>
    <div className="flex-justify-sb">
    <Select
      defaultValue={defaultFirstSelectValue}
      style={{ width: "150px" }}
      options={cryptolist}
      onChange={(value)=>{setFirstSelect(value)}}
    />
    <Select
      defaultValue={defaultSecondSelectValue}
      style={{ width: "150px" }}
      options={cryptolist}
      onChange={(value)=>{setSecondSelect(value)}}
        />
        </div>
		<p style={{textAlign: "center", fontSize: "1.2rem", color: "#34d4d4d", textShadow: "1px -1px orange"}}>{inputValue==="" ? 0 : inputValue} {firstSelect} <span style={{color: "crimson", fontSize: "1.25rem", textShadow: "1px 1px cyan", fontWeight: "700"}}>=</span> {result} {secondSelect}</p>
    </Card>
    </div>
    </Watermark>
  )
}

export default Converter