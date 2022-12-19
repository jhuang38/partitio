const pageRenderStyles = {
    display: 'flex',
    flexDirection: 'column',
    padding: 4
}

const modalBoxStyle = {
    position: 'absolute',
    backgroundColor: 'white',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
    display: 'flex',
    gap: 2,
    flexDirection: 'column',
    width: 'max(40%, 300px)',
}

const modalFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
}

export {pageRenderStyles, modalBoxStyle, modalFormStyle}