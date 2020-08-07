import React from 'react'

import { View, Text } from 'react-native'

import styles from './styles';
import PageHeader from '../../components/PageHeader';

function TeacherList() {
    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis"/>
            <Text> Listar Professores</Text>
        </View>
    )
}

export default TeacherList