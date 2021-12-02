import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const RPC_URLS: { [chainId: number]: string } = {
  1: 'https://mainnet.infura.io/v3/',
  3: 'https://ropsten.infura.io/v3/8d810610fe7741cc9753cbaafb1f000c',
};

const injected = new InjectedConnector({
  supportedChainIds: [1, 3],
});

const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true,
});

export { injected, walletconnect };
