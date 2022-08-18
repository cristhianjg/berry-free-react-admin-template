import Grid from '@mui/material/Grid';

const SelectionGrid = ({ items }) => {
    console.log(items);
    return (
        <Grid container>
            {items.map((item, idx) => (
                <Grid item xs={6} key={idx}>
                    {item}
                </Grid>
            ))}
        </Grid>
    );
};

export default SelectionGrid;
