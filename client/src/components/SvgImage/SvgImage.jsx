import tokenSvgs from "../../constants/token-svgs";

function getSvgFromName(name, height, width) {
    const SvgComponent = tokenSvgs[name];
    return SvgComponent ? <SvgComponent height={height} width={width}/> : <></>;
};

const SvgImage = ({ name, height = "35", width = "35" }) => {
    return (
        <>
            {getSvgFromName(name, height, width)}
        </>
    );
};

export default SvgImage;
