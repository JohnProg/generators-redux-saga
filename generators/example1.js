// Pausable || iterable function
function* generator1() {
    console.log('A');
    yield 'test 1';
    console.log('B');
    yield 'test 2'
}

const g1 = generator1();

// console.log(g1.next());
// console.log(g1.next());
// console.log(g1.next());

for (const iterator of g1) {
    console.log(iterator);
}
