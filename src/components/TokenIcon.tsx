import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';


export const TokenIcon = (props: { mint: string, size: number }) => {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

  useEffect(() => {
    new TokenListProvider().resolve().then(tokens => {
      const tokenList = tokens.filterByChainId(101).getList();

      setTokenMap(tokenList.reduce((map, item) => {
        map.set(item.address, item);
        return map;
      },new Map()));
    });
  }, [setTokenMap]);

  const token = tokenMap.get(props.mint);
  if (!token || !token.logoURI) return null;

  return (
    <Avatar size={props.size} src={token.logoURI} />
  )
}