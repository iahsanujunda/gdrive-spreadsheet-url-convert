import React, {useState} from "react";
import {Grid, Paper, TextField, Button} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const HomePage = () => {
    const [url, setUrl] = useState('');
    const [convertedUrl, setConvertedUrl] = useState('converted');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
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
                    <p>Convert image sharing URL from Google Drive into an embeddable format</p>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <TextField
                                label="URL"
                                fullWidth>{ url }</TextField>
                        </Grid>
                        <Grid item alignItems="stretch" style={{ display: "flex" }} xs={2}>
                            <Button color="primary" variant="contained" fullWidth>
                                Convert
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{
                        marginTop: '16px'
                    }}>
                        <Grid item xs={10}>
                            <TextField
                                label="Converted URL"
                                fullWidth
                                value={ url }
                            />
                        </Grid>
                        <Grid item alignItems="stretch" style={{ display: "flex" }} xs={2}>
                            <Button color="primary" variant="contained" fullWidth>
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