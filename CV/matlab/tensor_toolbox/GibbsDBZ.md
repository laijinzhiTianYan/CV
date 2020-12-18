for mode=1:size(U,1)
    for k=1:size(U{mode},2)
        if mode==1
            D_n=kron(U{3},U{2});
        end

        if mode==2
            D_n=kron(U{3},U{1});
        end
        if mode==3         
            D_n=kron(U{2},U{1});
        end
            
            A= B.*Z;
            Cnk=tenmat(A,mode)*D_n';
            cnk=Cnk.data;
            Xn=tenmat(X,mode);
            Xn=Xn.data;
            %-U{mode}*C+u(:,k)*C(k,:);
            Xn=Xn-U{mode}*cnk+U{mode}(:,k)*cnk(k,:);
            %Sample D
            sig_Dk = 1./(phi*cnk(k,:)*cnk(k,:)'+size(X,mode));
            mu_D = phi*sig_Dk.*(Xn*cnk(k,:)');
            U{mode}(:,k) = mu_D + randn(size(X,mode),1).*sqrt(sig_Dk);

            %Sample Z he B
            D=kron(U{3},kron(U{2},U{1}));
            X_vec=reshape(X,[prod(size(X)),1]);
            B_vec=reshape(B,[prod(size(B)),1]);
            Z_vec=reshape(Z,[prod(size(Z)),1]);
            b=zeros(numel(B),1);
            z=zeros(numel(Z),1);
            for i=1:64
                x_k=X_vec-D*(B_vec.*Z_vec)+(B_vec(i)*Z_vec(i))*D(:,i);
                temp=-0.5*phi.*(B_vec(i).^2*D(:,i)'*D(:,i)-2*B_vec(i)*D(:,i)'*double(x_k));
                p1=Pi(i)*exp(temp);
                z(i)=(rand(1)>(1-p1));
                
                sig_b=1./(alpha(i)+phi*Z_vec(i).^2*D(:,i)'*D(:,i));
                mu_b=phi*Z_vec(i)*sig_b*D(:,i)'*double(x_k);
                b(i)=mu_b+randn(1).*sqrt(sig_b);
            end
            
           B=reshape(z,size(B));
           Z=reshape(z,size(Z));
            save B Z;
    end
end

