import React, { useEffect, useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import { Contract } from 'ethers';

import { useUserFacade } from 'state';
import { injected, walletconnect } from 'config/connectors';
import { DAIAddress } from '../../constants';
import { ERC20ABI } from '../../constants/abis';

import { AppBar, Box, Toolbar, Typography, Button, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  button: {
    width: '100%',
    marginTop: '10px !important',
  },
  accountInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});

export const Header = () => {
  const { chainId, account, activate, deactivate, library } = useWeb3React();

  const classes = useStyles();
  const { userState, updateUserInfo } = useUserFacade();
  const { balance: userBalance } = userState;

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onConnectWallet = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onConnectMetaMask = useCallback(() => {
    activate(injected);
    closeModal();
  }, [activate, closeModal]);

  const onConnectWalletConnect = useCallback(() => {
    activate(walletconnect);
    closeModal();
  }, [activate, closeModal]);

  const getBalance = async () => {
    const contract = new Contract(
      DAIAddress,
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

  useEffect(() => {
    updateUserInfo({ address: account });

    if (account) {
      getBalance();
    }
  }, [account]);

  useEffect(() => {
    if (chainId && chainId !== 3) {
      alert('Please change your Metamask network to Ropsten.');
      deactivate();
    }
  }, [account, chainId, deactivate]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Defi App
          </Typography>
          {account === undefined ? (
            <Button variant="contained" size="medium" onClick={onConnectWallet}>
              Connect Wallet
            </Button>
          ) : (
            <Box className={classes.accountInfo}>
              <Typography component="p">
                {account?.slice(0, 6)}...{account?.slice(-4)}
              </Typography>
              {userBalance && userBalance.eth && (
                <Typography component="p">
                  {parseFloat(formatEther(userBalance.eth)).toPrecision(4)} ETH
                </Typography>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Modal open={isOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Button
            variant="contained"
            className={classes.button}
            onClick={onConnectMetaMask}
          >
            Connect MetaMask
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={onConnectWalletConnect}
          >
            Connect WalletConnect
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
