import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task !== '') {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const handleRemoveTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = taskId => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yapılacaklar</Text>
      <FlatList
        style={styles.taskList}
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={item.completed ? styles.completedText : null}>
              {item.text}
            </Text>
            <Button
              color='#0d59b6'
              title={item.completed ? "Geri Al" : "Tamamlandı"}
              onPress={() => handleToggleComplete(item.id)}
            />
            {item.completed && (
              <Button
                color='#0d59b6'
                title="Sil"
                onPress={() => handleRemoveTask(item.id)}
              />
            )}
          </View>
        )}
      />
    <View style={styles.addTask}>  
     <TextInput
        style={styles.input}
        placeholder="Yapılacak..."
        value={task}
        onChangeText={text => setTask(text)}
      />
      <Button title="Kaydet" color={'#0d59b6'} onPress={handleAddTask} />
    </View>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#0d59b6',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight:'bold',
    marginBottom: 10,
    marginTop:10,
    color:'#eef3f9'
  },
  input: {
    width:'100%',
    height:50,
    paddingLeft:10,
    borderBottomWidth:0.5,
    borderBottomColor:'#0d59b6'
  },
  taskList: {
    width: '100%',
    marginTop:20,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    padding:3,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'white',
    borderRadius:10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize:'20',
    fontWeight:'bold'
  },
  addTask:{
    width:'100%',
    backgroundColor:'white',
    marginBottom:250,
    borderRadius:10
  },
});

export default App;



