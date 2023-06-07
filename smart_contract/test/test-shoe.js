const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Shoe NFT", function () {
    let [accountA, accountB, accountC] = []
    let shoe
    let address0 = "0x0000000000000000000000000000000000000000"
    let uri = "sampleuri.com/"
    beforeEach(async () => {
        [accountA, accountB, accountC] = await ethers.getSigners();
        const Shoe = await ethers.getContractFactory("Shoe");
        shoe = await Shoe.deploy()
        await shoe.deployed()
    })
    describe("mint", function () {
        it("should revert if mint to zero address", async function () {
            await expect(shoe.mint(address0)).to.be.revertedWith("ERC721: mint to the zero address")
        });
        it("should mint token correctly", async function () {
            const mintTx = await shoe.mint(accountA.address)
            await expect(mintTx).to.be.emit(shoe, "Transfer").withArgs(address0, accountA.address, 1)
            expect(await shoe.balanceOf(accountA.address)).to.be.equal(1)
            expect(await shoe.ownerOf(1)).to.be.equal(accountA.address)
            const mintTx2 = await shoe.mint(accountA.address)
            await expect(mintTx2).to.be.emit(shoe, "Transfer").withArgs(address0, accountA.address, 2)
            expect(await shoe.balanceOf(accountA.address)).to.be.equal(2)
            expect(await shoe.ownerOf(2)).to.be.equal(accountA.address)
        });
    })
    describe("updateBaseTokenURI", function () {
        it("should update Base Token URI correctly", async function () {
            await shoe.mint(accountA.address)
            await shoe.updateBaseTokenURI(uri)
            expect(await shoe.tokenURI(1)).to.be.equal(uri+"1")
        });
    })
})