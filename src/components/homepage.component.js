import React, {useState} from "react";
import {Grid, Paper, TextField, Button} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const HomePage = () => {
    const [url, setUrl] = useState('');
    const [sheetName, setSheetName] = useState('');
    const [convertedUrl, setConvertedUrl] = useState('');
    const [isConvert, setIsConvert] = useState(false)

    const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const handleChangeSheetName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSheetName(event.target.value);
    };

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(convertedUrl)
            .then(() => {
                // If successful, update the isCopied state value
                setConvertedUrl('Copied to clipboard!');
                setTimeout(() => {
                    setConvertedUrl(convertedUrl);
                }, 2500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleReset = () => {
        setUrl('')
        setConvertedUrl('')
        setSheetName('')
        setIsConvert(false)
    }

    const handleConvertUrl = () => {
        const found = url.match( /d\/([A-Za-z_\d-]+)/ );
        
        if ( found[1].length ) {
            const convert_url = `https://docs.google.com/spreadsheets/d/${found[1]}/gviz/tq?tqx=out:csv&sheet=${sheetName}`

            setConvertedUrl(convert_url);
            setIsConvert(true);
        }
    };

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={8}>
                <Paper
                    variant="outlined"
                    elevation={4}
                    sx={{
                        padding: '20px 50px',
                        backgroundColor: '#eeecec'
                    }}
                >
                    <p>Convert sharing URL of Google spreadsheet to be imported from pandas.read_csv</p>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <TextField
                                label="Spread Sheet Sharing URL"
                                fullWidth
                                value={ url }
                                onChange={ handleChangeUrl }
                            />
                        </Grid>
                        <Grid item alignItems="stretch" style={{ display: "flex" }} xs={2}>
                            {
                                isConvert === false &&
                                <Button color="primary" variant="contained" fullWidth onClick={ handleConvertUrl }>
                                    Convert
                                </Button>
                            }
                            {
                                isConvert === true &&
                                <Button color="error" variant="contained" fullWidth onClick={ handleReset }>
                                    Reset
                                </Button>
                            }
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{
                        marginTop: '16px'
                    }}>
                        <Grid item xs={10}>
                            <TextField
                                label="Sheet Name"
                                fullWidth
                                value={ sheetName }
                                onChange={ handleChangeSheetName }
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{
                        marginTop: '16px'
                    }}>
                        <Grid item xs={10}>
                            <TextField
                                label="Converted URL"
                                fullWidth
                                value={ convertedUrl }
                                disabled
                            />
                        </Grid>
                        <Grid item alignItems="stretch" style={{ display: "flex" }} xs={2}>
                            <Button color="primary" variant="contained" fullWidth onClick={ handleCopyClick }>
                                <ContentCopyIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default HomePage;