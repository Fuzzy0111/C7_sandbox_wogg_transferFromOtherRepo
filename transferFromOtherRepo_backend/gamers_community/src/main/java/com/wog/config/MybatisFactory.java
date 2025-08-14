package com.wog.config;

import com.wog.mapper.AuthorMapper;
import com.wog.mapper.UserMapper;
import com.wog.mapper.StockItemMapper;
import com.wog.mapper.StockMapper;
import com.wog.mapper.ReservationMapper;


import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.ibatis.transaction.TransactionFactory;
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory;

import javax.sql.DataSource;

@Factory
public class MybatisFactory {

    private final DataSource dataSource;

    public MybatisFactory(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Singleton
    public SqlSessionFactory sqlSessionFactory() {
        TransactionFactory transactionFactory = new JdbcTransactionFactory();
        Environment environment = new Environment("development", transactionFactory, dataSource);
        Configuration configuration = new Configuration(environment);

        configuration.setMapUnderscoreToCamelCase(true);

        configuration.addMapper(StockMapper.class);
        configuration.addMapper(StockItemMapper.class);
        configuration.addMapper(AuthorMapper.class);
        configuration.addMapper(UserMapper.class);
        configuration.addMapper(ReservationMapper.class);

        return new SqlSessionFactoryBuilder().build(configuration);
    }

    @Singleton
    public StockMapper stockMapper(SqlSessionFactory sqlSessionFactory) {
        return sqlSessionFactory.openSession(true).getMapper(StockMapper.class);
    }

    @Singleton
    public StockItemMapper stockItemMapper(SqlSessionFactory sqlSessionFactory) {
        return sqlSessionFactory.openSession(true).getMapper(StockItemMapper.class);
    }

    @Singleton
    public AuthorMapper authorMapper(SqlSessionFactory sqlSessionFactory) {
        return sqlSessionFactory.openSession(true).getMapper(AuthorMapper.class);
    }

    @Singleton
    public UserMapper userMapper(SqlSessionFactory sqlSessionFactory) {
        return sqlSessionFactory.openSession(true).getMapper(UserMapper.class);
    }

    @Singleton
    public ReservationMapper reservationMapper(SqlSessionFactory sqlSessionFactory) {
        return sqlSessionFactory.openSession(true).getMapper(ReservationMapper.class);
    }
}
