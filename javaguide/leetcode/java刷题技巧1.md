1、集合取交集方法 retainAll()
```public int[] intersection(int[] nums1, int[] nums2) {
       HashSet<Integer> set1=new HashSet<>();
		for(Integer n:nums1)
		{
			set1.add(n);
		}
		HashSet<Integer> set2=new HashSet<>();
		for(Integer n:nums2)
		{
			set2.add(n);
		}
		set1.retainAll(set2); //取交集
		int[] output=new int[set1.size()];
		int idx=0;
		for(int i:set1)
		{
			output[idx++]=i;
		}
		return output; 
    }
```