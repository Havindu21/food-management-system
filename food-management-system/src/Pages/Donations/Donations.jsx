import { Box, Typography, TextField, Grid2, Autocomplete, createFilterOptions, Button } from '@mui/material';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BasicTable from '../../Components/BasicTable';

const filter = createFilterOptions();

const Donations = () => {
    const [value, setValue] = React.useState(null);
    return (
        <Box sx={{ width: '100%' }}>
            <Typography sx={{
                fontSize: { xs: 20, md: 22 },
                fontWeight: { xs: 500, md: 600 },
                color: '#3F4F44',
            }}>
                Donate Now
            </Typography>
            <Typography sx={{
                fontSize: { xs: 14, md: 16 },
                color: '#686D76',
            }}>
                Track and manage your food donations
            </Typography>

            <Box sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 2, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: '#FFFFFF',
                mt: 4,
                borderRadius: 2,
            }}>
                <Typography sx={{
                    fontSize: { xs: 16, md: 18 },
                    fontWeight: 600,
                }}>
                    Donate Food
                </Typography>
                <Grid2 container spacing={4}>
                    {fields.map((field, index) => (
                        <Grid2 item key={index} size={{ xs: 12, md: 6 }}>
                            <Typography sx={{
                                fontSize: { xs: 14, md: 16 },
                                fontWeight: 500,
                                mb: 1
                            }}>
                                {field.title}
                            </Typography>
                            {field.title === 'Expiration Date' ? (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{ width: '100%' }} // Ensures the component itself is 100% width
                                        slotProps={{
                                            textField: {
                                                fullWidth: true, // Ensures TextField takes full width
                                                sx: {
                                                    '& .MuiInputBase-root': {
                                                        height: 40,
                                                        width: '100%', // Forces input base to full width
                                                    },
                                                    '& .MuiOutlinedInput-root': {
                                                        width: '100%', // Fixes outlined input width issue
                                                    },
                                                    '& .MuiFormLabel-root': {
                                                        mt: -1, // Adjusts label spacing
                                                    },
                                                }
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                            ) : field.title === 'Food Category' ? (
                                <Autocomplete
                                    size='small'
                                    value={value}
                                    onChange={(event, newValue) => {
                                        if (typeof newValue === 'string') {
                                            setValue({
                                                title: newValue,
                                            });
                                        } else if (newValue && newValue.inputValue) {
                                            // Create a new value from the user input
                                            setValue({
                                                title: newValue.inputValue,
                                            });
                                        } else {
                                            setValue(newValue);
                                        }
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);

                                        const { inputValue } = params;
                                        // Suggest the creation of a new value
                                        const isExisting = options.some((option) => inputValue === option.title);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                inputValue,
                                                title: `Add "${inputValue}"`,
                                            });
                                        }

                                        return filtered;
                                    }}
                                    selectOnFocus
                                    clearOnBlur
                                    handleHomeEndKeys
                                    id="free-solo-with-text-demo"
                                    options={top100Films}
                                    getOptionLabel={(option) => {
                                        // Value selected with enter, right from the input
                                        if (typeof option === 'string') {
                                            return option;
                                        }
                                        // Add "xxx" option created dynamically
                                        if (option.inputValue) {
                                            return option.inputValue;
                                        }
                                        // Regular option
                                        return option.title;
                                    }}
                                    renderOption={(props, option) => {
                                        const { key, ...optionProps } = props;
                                        return (
                                            <li key={key} {...optionProps}>
                                                {option.title}
                                            </li>
                                        );
                                    }}
                                    freeSolo
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            ) : (
                                <TextField
                                    size='small'
                                    fullWidth
                                    variant="outlined"
                                    placeholder={`Enter ${field.title.toLowerCase()}`}
                                />
                            )}
                        </Grid2>
                    ))}
                </Grid2>
                <Button sx={{
                    width: { xs: '100%', md: 150, },
                    bgcolor: '#059669',
                    py:1,
                    mt:2,
                }}>
                    <Typography sx={{
                        fontSize: { xs: 14, md: 16 },
                        fontWeight: 500,
                        color: '#FFFFFF',
                    }}>
                        Submit
                    </Typography>
                </Button>
            </Box>
            <Box sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 2, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: '#FFFFFF',
                mt: 4,
                borderRadius: 2,
            }}>
                <Typography sx={{
                    fontSize: { xs: 16, md: 18 },
                    fontWeight: 600,
                }}>
                    Pending Donations
                </Typography>
                <Box sx={{ pb: { xs: 4, md: 0 } }}>
                    <BasicTable headers={tableHeaders} data={tableData} />
                </Box>
            </Box>
        </Box >
    );
};

export default Donations;

const tableHeaders = ["Date", "Items", "Quantity"];
const tableData = [
    { Date: "2025-03-15", Items: "Laptop", Quantity: 3 },
    { Date: "2025-03-18", Items: "Mouse", Quantity: 5 },
    { Date: "2025-03-19", Items: "Keyboard", Quantity: 2 },
    { Date: "2025-03-20", Items: "Monitor", Quantity: 1 },
];

const fields = [
    { title: 'Food Category' },
    { title: 'Quantity (kg or g)' },
    { title: 'Expiration Date' },
    { title: 'Pickup Location' },
];

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];