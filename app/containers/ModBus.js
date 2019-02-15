/* eslint-disable no-restricted-syntax */
import ModbusRTU  from "modbus-serial";
import {bindActionCreators} from "redux";
import { UPDATE_MAP } from '../actions/actions';
import map from '../reducers/map';
import { connect } from 'react-redux';



const client = new ModbusRTU();

export function InitModBusPort () {
  client.connectRTUBuffered("COM1",{
    baudRate: 115200,
    dataBits: 8, /* 5, 6, 7 */
    stopBits: 1, /* 1.5, 2 */
    parity: 'odd', /* even, odd, mark, space */
    });
    client.setID(1);
}

export const getValue  = async(oldMap, dispatch) => {
  try{
    const newMap = [];

    for(const itemMap of oldMap){
      const value = await getValueAsync(itemMap.addr, itemMap.count);
      const tempObj = {
        val: Number(value),
        addr: itemMap.addr,
        count: itemMap.count
      };
      newMap.push(tempObj);
    }

    dispatch(newMap);
  }
  catch(e){
    // console.log(e);
  }
}

export const setValue = async(newValue, addr) => {
  await client.writeRegisters(addr, newValue);
}

const getValueAsync = async(addr, count) => {
  const response =  await client.readHoldingRegisters(addr, count);
  let answer = 0;
  switch (count) {
    case 2:
      answer = response.data[0] << 16;
      answer += response.data[1];
      break;  
    default:
      answer = response.data[0];
      break;
  }

  return answer;
}

