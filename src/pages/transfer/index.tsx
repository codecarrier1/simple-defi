import React, { useState, useEffect, Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatEther, parseEther } from '@ethersproject/units';
import { Contract } from '@ethersproject/contracts';

import { useUserFacade } from 'state';
import { DAIAddress } from '../../constants';
import { ERC20ABI } from '../../constants/abis';

import {
  CssBaseline,
  Box,
  Container,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  formInput: {
    marginTop: 20,

    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function Transfer() {
  const classes = useStyles();
  const { account, library } = useWeb3React();
  const { userState, updateUserInfo } = useUserFacade();
  const { balance: userBalance } = userState;

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('0');
  const [txHash, setTxHash] = useState('');
  const [recipient, setRecipient] = useState('');

  const getBalance = async () => {
    const contract = new Contract(
      '0xad6d458402f60fd3bd25163575031acdce07538d',
      ERC20ABI,
      library.getSigner(account)
    );
    const daiBalance = await contract.balanceOf(account);

    const ethBalance = await library.getBalance(account);

    updateUserInfo({
      balance: {
        ...userBalance,
        eth: ethBalance.toString(),
        dai: daiBalance.toString(),
      },
    });
  };

  const formatFloat = (balance: string) => {
    return parseFloat(formatEther(balance || '0'));
  };

  const handleTransfer = async () => {
    const ERC20Contract = new Contract(
      DAIAddress,
      ERC20ABI,
      library.getSigner()
    );

    let tx = await ERC20Contract.transfer(recipient, parseEther(amount));
    setTxHash(tx.hash);
    setLoading(true);
    await tx.wait();
    setLoading(false);
    getBalance();
  };

  const onViewTransactionHash = async () => {
    window.open(`https://ropsten.etherscan.io/tx/${txHash}`, '_blink');
  };

  return (
    <>
      <Container>
        <Box
          maxWidth="300px"
          margin="auto"
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%">
            <Box width="100%">
              <TextField
                label="Enter DAI Amount"
                variant="filled"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
              />
              <Typography marginBottom={2}>
                Balance: {formatFloat(userBalance.dai).toFixed(4)} DAI
              </Typography>
            </Box>
            <Box width="100%">
              <TextField
                label="Enter recipient address"
                variant="filled"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                fullWidth
              />
            </Box>
          </Box>
          <Box
            marginTop={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Button
              variant="contained"
              disabled={
                parseFloat(amount) >= formatFloat(userBalance.dai) ||
                amount === '0' ||
                !recipient ||
                loading
              }
              onClick={handleTransfer}
            >
              {parseFloat(amount) >= formatFloat(userBalance.dai) ||
              amount === '0'
                ? 'Input Valid Amount'
                : loading
                ? 'Sending...'
                : 'Send'}
            </Button>
            {txHash && (
              <Button variant="contained" onClick={onViewTransactionHash}>
                VIEW ON ETHERSCAN
              </Button>
            )}
          </Box>
        </Box>
      </Container>
      <CssBaseline />
    </>
  );
}
