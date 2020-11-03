[LinkedList 方法大全（栈、队列）](https://blog.csdn.net/liuxiao723846/article/details/50504987)
**其中2、实现队列：**

importjava.util.LinkedList;

importjava.util.Queue;

 

public classMyQueue<T> {
    private Queue<T> storage = newLinkedList<T>();

 

    /** 将指定的元素插入队尾 */

    public void offer(T v) {
        storage.offer(v);

    }

 

    /** 检索，但是不移除队列的头，如果此队列为空，则返回 null */

    public T peek() {
        return storage.peek();

    }

 

    /** 检索，但是不移除此队列的头 */

    /** 此方法与 peek 方法的惟一不同是，如果此队列为空，它会抛出一个异常 */

    public T element() {
        return storage.element();

    }

 

    /** 检索并移除此队列的头，如果队列为空，则返回 null */

    public T poll() {
        return storage.poll();

    }

 

    /** 检索并移除此队列的头 */

    /** 此方法与 poll 方法的不同在于，如果此队列为空，它会抛出一个异常 */

    public T remove() {
        return storage.remove();

    }

 

    /** 队列是否为空 */

    public boolean empty() {
        return storage.isEmpty();

    }

 

    /** 打印队列元素 */

    public String toString() {
        return storage.toString();

    }

}

说明：使用java.util.Queue接口,其底层关联到一个LinkedList（双端队列）实例。由于只暴露部分基于队列实现的接口，所以可以提供安全的队列实现。