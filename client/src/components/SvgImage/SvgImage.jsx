import tokenSvgs from "../../constants/token-svgs";

function getSvgFromName(name) {
    const SvgComponent = tokenSvgs[name];
    return SvgComponent ? <SvgComponent height="35" width="35" /> : <></>;
};

const SvgImage = ({ name }) => {
    return (
        <>
            {getSvgFromName(name)}
        </>
    );
};

export default SvgImage;
