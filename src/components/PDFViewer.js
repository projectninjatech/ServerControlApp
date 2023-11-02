import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

// create a component
const PDFViewer = (props) => {

    const [currentPage, setCurrentPage] = useState(0)
    const [showPageNum, setShowPageNum] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    const handleSingleTap = () => {
        props.toggleshowBottomTabs();
        setShowPageNum(!showPageNum)
    };

    return (

        <View style={styles.container}>

            <Pdf
                trustAllCerts={false}
                enableAntialiasing={true}

                fitPolicy={2}
                source={{
                    uri: props.pdfUrl,
                    cache: true,
                }}
                onLoadComplete={(numberOfPages, filePath) => {
                    // console.warn(`Number of pages: ${numberOfPages}`);
                    setTotalPages(numberOfPages);
                }}
                onPageChanged={(page, numberOfPages) => {
                    setCurrentPage(page)
                }}
                onError={(error) => {
                    console.warn(error);
                }}
                onPressLink={(uri) => {
                    console.warn(`Link pressed: ${uri}`);
                }}
                onPageSingleTap={() => {
                    handleSingleTap()
                }}
                style={styles.pdf} />

            {showPageNum && <Text style={styles.pageNum}>Page: {currentPage}/{totalPages}</Text>}

        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
    },

    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    pageNum: {
        color: 'white',
    },
});


export default PDFViewer;