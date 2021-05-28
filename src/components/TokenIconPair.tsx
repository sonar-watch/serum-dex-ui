import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';


export const TokenIconPair = (props: { symbolA: string, symbolB: string, size: number }) => {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

  useEffect(() => {
    new TokenListProvider().resolve().then(tokens => {
      const tokenList = tokens.filterByChainId(101).getList();

      setTokenMap(tokenList.reduce((map, item) => {
        map.set(item.symbol, item);
        return map;
      },new Map()));
    });
  }, [setTokenMap]);

  const tokenA = tokenMap.get(props.symbolA);
  const tokenB = tokenMap.get(props.symbolB);
  if (!tokenA || !tokenA.logoURI || !tokenB || !tokenB.logoURI) return null;

  return (
    <Avatar.Group>
      <Avatar size={props.size} style={{ border: '0' }} src={tokenA.logoURI} />
      <Avatar size={props.size} style={{ border: '0' }} src={tokenB.logoURI} />
    </Avatar.Group>
  )
}