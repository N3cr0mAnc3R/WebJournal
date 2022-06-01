using System.Diagnostics;

namespace ESchool.Models.Abstract
{
    public class DataContext<TContext> where TContext : DataContext<TContext>
    {
        public IDBService Database { get; set; }


        /// <summary>
        /// Создать экземпляр контекста
        /// </summary>
        /// <typeparam name="T">тип контекста</typeparam>
        /// <param name="connectionName">имя соедиение, если отличное от соединения по-умолчанию</param>
        /// <returns></returns>
        public static TContext Create(IDBService database)
        {
            TContext context = Activator.CreateInstance<TContext>();
            context.Database = database;
            return context;
        }

        /// <summary>
        /// Shortcut для вызова одиночных методов контекста с освобождением ресурсов
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="operation">выполняемая операция</param>
        /// <param name="connectionName">имя соедиение, если отличное от соединения по-умолчанию</param>
        /// <returns></returns>
        public static TResult Exec<TResult>(Func<TContext, TResult> operation, IDBService database)
        {
            Debug.Assert(operation != null);

            return operation(DataContext<TContext>.Create(database));
        }


        /// <summary>
        /// Shortcut для вызова одиночных методов контекста с освобождением ресурсов
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="operation">выполняемая операция</param>
        /// <param name="connectionName">имя соедиение, если отличное от соединения по-умолчанию</param>
        /// <returns></returns>
        public static Task<TResult> ExecAsync<TResult>(Func<TContext, Task<TResult>> operation, IDBService database)
        {
            Debug.Assert(operation != null);

            return operation(DataContext<TContext>.Create(database));
        }
    }
}
