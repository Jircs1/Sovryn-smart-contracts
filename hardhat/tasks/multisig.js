/* eslint-disable no-console */
const { task } = require("hardhat/config");
const { ethers } = require("ethers");
const Logs = require("node-logs");
const {
    signWithMultisig, // <---- this calls and executes multisig.confirmTransaction(txId)
    multisigCheckTx, // this calls and prints multisig.transactions (public mapping)
    multisigRevokeConfirmation, // this calls and executes multisig.revokeConfirmation(txId)
    multisigExecuteTx, // <---- this calls and executes multisig.executeTransaction(txId)
    multisigAddOwner, // this calls and executes multisig.addOwner(newOwner)
    multisigRemoveOwner, // this calls and executes multisig.removeOwner(owner)
} = require("../../deployment/helpers/helpers");

const logger = new Logs().showInConsole(true);

task("multisig:sign-tx", "Sign multisig tx")
    .addPositionalParam("id", "Multisig transaction to sign", undefined, types.string)
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .addOptionalParam("multisig", "Multisig wallet address", ethers.constants.AddressZero)
    .setAction(async ({ id, signer, multisig }, hre) => {
        const {
            deployments: { get },
            ethers,
        } = hre;

        const signerAcc = ethers.utils.isAddress(signer)
            ? signer
            : (await hre.getNamedAccounts())[signer];

        if (!ethers.utils.isAddress(multisig)) {
            multisig = ethers.constants.AddressZero;
        }
        const code = await ethers.provider.getCode(multisig);
        if (code === "0x") {
            multisig = ethers.constants.AddressZero;
        }
        const ms =
            multisig === ethers.constants.AddressZero
                ? await get("MultiSigWallet")
                : await ethers.getContractAt("MultiSigWallet", multisig);
        await signWithMultisig(ms.address, id, signerAcc);
    });

task("multisig:sign-txs", "Sign multiple multisig tx")
    .addPositionalParam(
        "ids",
        "Multisig transactions to sign. Supports '12,14,16-20,22' format where '16-20' is a continuous range of integers",
        undefined,
        types.string
    )
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .addOptionalParam("multisig", "Multisig wallet address", ethers.constants.AddressZero)
    .setAction(async ({ ids, signer, multisig }, hre) => {
        const {
            deployments: { get },
            ethers,
        } = hre;
        const signerAcc = ethers.utils.isAddress(signer)
            ? signer
            : (await hre.getNamedAccounts())[signer];
        if (!ethers.utils.isAddress(multisig)) {
            multisig = ethers.constants.AddressZero;
        }
        const code = await ethers.provider.getCode(multisig);
        if (code === "0x") {
            multisig = ethers.constants.AddressZero;
        }
        const ms =
            multisig === ethers.constants.AddressZero
                ? await get("MultiSigWallet")
                : await ethers.getContractAt("MultiSigWallet", multisig);
        const txnArray = ids.split(",");
        for (let txId of txnArray) {
            if (typeof txId !== "string" || txId.indexOf("-") === -1) {
                await signWithMultisig(ms.address, txId, signerAcc);
            } else {
                const txnRangeArray = txId.split("-", 2).map((num) => parseInt(num));
                for (let id = txnRangeArray[0]; id <= txnRangeArray[1]; id++) {
                    await signWithMultisig(ms.address, id, signerAcc);
                }
            }
        }
    });

task("multisig:execute-tx", "Execute multisig tx by one of tx signers")
    .addPositionalParam("id", "Multisig transaction to sign", undefined, types.string)
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .addOptionalParam("multisig", "Multisig wallet address", ethers.constants.AddressZero)
    .setAction(async ({ id, signer, multisig }, hre) => {
        const { ethers } = hre;
        const signerAcc = ethers.utils.isAddress(signer)
            ? signer
            : (await hre.getNamedAccounts())[signer];
        if (!ethers.utils.isAddress(multisig)) {
            multisig = ethers.constants.AddressZero;
        }
        const code = await ethers.provider.getCode(multisig);
        if (code === "0x") {
            multisig = ethers.constants.AddressZero;
        }
        await multisigExecuteTx(id, signerAcc, multisig);
    });

task("multisig:execute-txs", "Execute multisig tx by one of tx signers")
    .addPositionalParam("ids", "Multisig transaction to sign", undefined, types.string)
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .addOptionalParam("multisig", "Multisig wallet address", ethers.constants.AddressZero)
    .setAction(async ({ id, signer, multisig }, hre) => {
        const { ethers } = hre;
        const signerAcc = ethers.utils.isAddress(signer)
            ? signer
            : (await hre.getNamedAccounts())[signer];
        if (!ethers.utils.isAddress(multisig)) {
            multisig = ethers.constants.AddressZero;
        }
        const code = await ethers.provider.getCode(multisig);
        if (code === "0x") {
            multisig = ethers.constants.AddressZero;
        }

        const txnArray = ids.split(",");
        for (let txId of txnArray) {
            if (typeof txId !== "string" || txId.indexOf("-") === -1) {
                await multisigExecuteTx(txId, signerAcc, multisig);
            } else {
                const txnRangeArray = txId.split("-", 2).map((num) => parseInt(num));
                for (let id = txnRangeArray[0]; id <= txnRangeArray[1]; id++) {
                    await multisigExecuteTx(txId, signerAcc, multisig);
                }
            }
        }
    });

task("multisig:check-tx", "Check multisig tx")
    .addPositionalParam("id", "Multisig transaction id to check", undefined, types.string)
    .addOptionalParam("multisig", "Multisig wallet address", ethers.constants.AddressZero)
    .setAction(async ({ id, multisig }, hre) => {
        const { ethers } = hre;
        const code = await ethers.provider.getCode(multisig);
        if (code === "0x") {
            multisig = ethers.constants.AddressZero;
        }
        await multisigCheckTx(id, multisig);
    });

task("multisig:check-txs", "Check multiple multisig txs")
    .addPositionalParam("ids", "Multisig transaction ids list to check", undefined, types.string)
    .addOptionalParam("multisig", "Multisig wallet address", ethers.constants.AddressZero)
    .setAction(async ({ ids, multisig }, hre) => {
        const { ethers } = hre;
        if (!ethers.utils.isAddress(multisig)) {
            multisig = ethers.constants.AddressZero;
        }
        const code = await ethers.provider.getCode(multisig);
        if (code === "0x") {
            multisig = ethers.constants.AddressZero;
        }
        const txnArray = ids.split(",");
        for (let txId of txnArray) {
            if (typeof txId !== "string" || txId.indexOf("-") === -1) {
                await multisigCheckTx(txId, multisig);
            } else {
                const txnRangeArray = txId.split("-", 2).map((num) => parseInt(num));
                for (let id = txnRangeArray[0]; id <= txnRangeArray[1]; id++) {
                    await multisigCheckTx(id, multisig);
                }
            }
        }
    });

task("multisig:revoke-sig", "Revoke multisig tx confirmation")
    .addPositionalParam(
        "id",
        "Multisig transaction ids to revoke confirmation from",
        undefined,
        types.string
    )
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .addOptionalParam("multisig", "Multisig wallet address", ethers.constants.AddressZero)
    .setAction(async ({ id, signer, multisig }, hre) => {
        const {
            ethers,
            deployments: { get },
        } = hre;
        const signerAcc = ethers.utils.isAddress(signer)
            ? signer
            : (await hre.getNamedAccounts())[signer];
        if (!ethers.utils.isAddress(multisig)) {
            multisig = ethers.constants.AddressZero;
        }
        const code = await ethers.provider.getCode(multisig);
        if (code === "0x") {
            multisig = ethers.constants.AddressZero;
        }
        const ms =
            multisig === ethers.constants.AddressZero
                ? await get("MultiSigWallet")
                : await ethers.getContractAt("MultiSigWallet", multisig);
        await multisigRevokeConfirmation(id, signerAcc, ms.address);
    });

task("multisig:revoke-sigs", "Revoke multisig tx confirmation")
    .addPositionalParam(
        "ids",
        "Multisig transaction to revoke confirmation from",
        undefined,
        types.string
    )
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .addOptionalParam("multisig", "Multisig wallet address", ethers.constants.AddressZero)
    .setAction(async ({ ids, signer, multisig }, hre) => {
        const signerAcc = ethers.utils.isAddress(signer)
            ? signer
            : (await hre.getNamedAccounts())[signer];
        const {
            ethers,
            deployments: { get },
        } = hre;
        if (!ethers.utils.isAddress(multisig)) {
            multisig = ethers.constants.AddressZero;
        }
        const code = await ethers.provider.getCode(multisig);
        if (code === "0x") {
            multisig = ethers.constants.AddressZero;
        }
        const ms =
            multisig === ethers.constants.AddressZero
                ? await get("MultiSigWallet")
                : await ethers.getContractAt("MultiSigWallet", multisig);
        const txnArray = ids.split(",");
        for (let txId of txnArray) {
            if (typeof txId !== "string" || txId.indexOf("-") === -1) {
                await multisigRevokeConfirmation(txId, signerAcc, ms.address);
            } else {
                const txnRangeArray = txId.split("-", 2).map((num) => parseInt(num));
                for (let id = txnRangeArray[0]; id <= txnRangeArray[1]; id++) {
                    await multisigRevokeConfirmation(id, signerAcc, ms.address);
                }
            }
        }
    });

task("multisig:add-owner", "Add or remove multisig owner")
    .addParam("address", "Owner address to add or remove", undefined, types.string)
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .setAction(async ({ address, signer }, hre) => {
        const signerAcc = ethers.utils.isAddress(signer)
            ? signer
            : (await hre.getNamedAccounts())[signer];
        await multisigAddOwner(address, signerAcc);
    });

task("multisig:remove-owner", "Add or remove multisig owner")
    .addParam("address", "Owner address to add or remove", undefined, types.string)
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .setAction(async ({ address, signer }, hre) => {
        const signerAcc = ethers.utils.isAddress(signer)
            ? signer
            : (await hre.getNamedAccounts())[signer];
        await multisigRemoveOwner(address, signerAcc);
    });
