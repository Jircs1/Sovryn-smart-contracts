
'''
This script serves the purpose of interacting with existing smart contracts on the testnet or mainnet.
'''
from scripts.contractInteraction.contract_interaction_imports import *

def main():
    '''
    run from CLI:
    brownie run scripts/contractInteraction/contract_interaction.py --network testnet
    brownie run scripts/contractInteraction/contract_interaction.py --network rsk-mainnet
    
    #####################################################################################
    
    run on forked nets:
    1) run a forked net at a block 
    * if forking at the last block don't use --fork-block-number option
    * use --no-deploy param to skip running hh deployment scripts by default 
    
    mainnet: 
    npx hardhat node --fork https://mainnet.sovryn.app/rpc --fork-block-number 4929553 --no-deploy
    
    testnet:   
    npx hardhat node --fork https://testnet.sovryn.app/rpc --fork-block-number 3495000 --no-deploy

    2) run the script respectively:
    export DEV_NET_NAME="testnet" && brownie run scripts/contractInteraction/contract_interaction.py --network development
    export DEV_NET_NAME="mainnet" && brownie run scripts/contractInteraction/contract_interaction.py --network development
    '''

    # call the function you want here

    #used often:

    #withdrawRBTCFromWatcher(30e18, conf.contracts['multisig'])
    
    #print("fastBTC.balance()", loadBiDiFastBTC().balance()/1e18)
    #withdrawRBTCFromFastBTCBiDi(33e18, conf.contracts['multisig'])
    
    #bal = getBalance(conf.contracts['SOV'], conf.contracts['Watcher'])
    #bal = getBalance(conf.contracts['FastBTCBiDi'], conf.contracts['Watcher'])
    #print(getContractBTCBalance(conf.contracts['multisig'])/1e18)
    #print(getBalanceNoPrintOf(conf.contracts['WRBTC'], conf.contracts["Watcher"])/1e18)
    #withdrawTokensFromWatcher(conf.contracts['XUSD'], 750000e18, conf.contracts['multisig'])
    #withdrawTokensFromWatcher(conf.contracts['USDT'], 150000e18, conf.contracts['multisig'])

    #sendTokensFromMultisig(conf.contracts['XUSD'], conf.contracts['Watcher'], 300000e18)
    #sendTokensFromMultisig(conf.contracts['SOV'], '0x4f3948816785e30c3378eD3b9F2de034e3AE2E97', 250000e18)
    #sendFromMultisig('0x986c65fc1783a445ceccade74234dc8627d429d8', 0.03e18)
    #sendFromMultisig(conf.contracts['FastBTC'], 15e18)
    #sendFromMultisig('0xc0AAcbDB9Ce627A348B91CfDB67eC6b2FBC3dCbd', 0.1e18)

    #withdrawRBTCFromIWRBTC('0x9BD6759F6D9eA15D33076e55d4CBba7cf85877A7', 1.6e18)
    #sendMYNTFromMultisigToFeeSharingProxy(36632.144056847e18)

    #MULTIPLE TXS CONFIRM & CHECK - the range is exact tx ids boundaries numbers
    #confirmMultipleTxsWithMS(960, 963)

    #mintAggregatedToken(conf.contracts['XUSDAggregatorProxy'], conf.contracts['USDT'], 1e18)

    #setupMarginLoanParams(conf.contracts['SOV'], conf.contracts['iXUSD'])
    #readOwner(conf.contracts['iXUSD'])
    
    #missed = getMissedBalance()
    #transferSOVtoLM(missed)
    #sendTokensFromMultisig(conf.contracts['SOV'], conf.contracts['StakingRewardsProxy'], 550000e18)
    #revokeConfirmation(1075)

    #withdrawFees()
    #readFeesController()
    #setFeesController(conf.contracts['FeeSharingProxy1DayStaking'])

    #bal = getContractBTCBalance(conf.contracts['FastBTCBiDi'])
    #print('FastBTC offramp balance:', bal/10**18)
    #transferRBTCFromFastBTCOffRampToOnRamp(bal)
    #withdrawRBTCFromWatcher(6e18, conf.contracts['FastBTC'])

    #redeemFromAggregatorWithMS(conf.contracts['XUSDAggregatorProxy'], conf.contracts['USDT'], 100000e18)
    #sendTokensFromMultisig(conf.contracts['USDT'], '0x4f3948816785e30c3378eD3b9F2de034e3AE2E97', 1000000e18)
    #bal = getBalance(conf.contracts['(WR)BTC/ETH'], conf.contracts['multisig'])
    #removeLiquidityV1toMultisigUsingWrapper(conf.contracts['RBTCWrapperProxyWithoutLM'], conf.contracts['ConverterBNBs'], 1e18, [conf.contracts['WRBTC'], conf.contracts['BNBs']], [1,1])

    #readMocOracleAddress()

    #bal = getBalance(conf.contracts['(WR)BTC/USDT2'], conf.contracts['multisig'])
    #removeLiquidityV2toMultisig(conf.contracts['ConverterUSDT'], conf.contracts['(WR)BTC/USDT2'], bal, 1)

    #getReturnForV2PoolToken(conf.contracts['ConverterUSDT'], conf.contracts['(WR)BTC/USDT2'], bal)

    #readAllVestingContractsForAddress('0xA6575f1D5Bd6545fBd34BE05259D9d6ae60641f2')
    #getStakes('0x750C49DD9928061Df2224AA81E08Bc4a3c334874')
    #governanceDirectWithdrawVesting('0x750C49DD9928061Df2224AA81E08Bc4a3c334874', conf.contracts['multisig'], 0) // last params is for startFrom arguments

    #addOwnerToMultisig('0x832E1bd30d037d0327F2A0447eD44FB952A9a043')
    #removeOwnerFromMultisig('0x27d55f5668ef4438635bdce0adca083507e77752')

    # # ---------- Transfer ownership to gov ----------
    # # core protocol
    # transferProtocolOwnershipToGovernance()

    # # loan token
    # transferBeaconOwnershipToGovernance()
    # transferLoanTokenAdminRoleToGovernance()
    # transferLoanTokenOwnershipToGovernance()

    # # oracles
    # transferOracleOwnershipToGovernance()

    # # LM
    # transferLiquidityMiningOwnershipToGovernance()

    # # Governance
    # # lockedSOV
    # transferLockedSOVOwnershipToGovernance()

    # # Staking
    # transferStakingOwnershipToGovernance()

    # # StakingRewards
    # transferStakingRewardsOwnershipToGovernance()

    # # VestingRegistry
    # transferVestingRegistryOwnershipToGovernance()



