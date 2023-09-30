export const nftImg = (tokenId: number) => {
    if (tokenId > 100) {
        return `${tokenId}.jpg`;
    } else if (tokenId > 9) {
        return `0${tokenId}.jpg`;
    } else {
        return `00${tokenId}.jpg`;
    }
}
